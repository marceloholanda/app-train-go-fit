
const CACHE_NAME = 'traingo-cache-v2'; // Incrementing cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/lovable-uploads/9dd7f714-326a-48f8-8409-de070f485483.png'
];

// Installation
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[ServiceWorker] Cache error:', error);
      })
  );
  // Force the waiting ServiceWorker to become the active ServiceWorker
  self.skipWaiting();
});

// Activation - clear old caches to prevent stale content issues
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Claim any clients immediately
  return self.clients.claim();
});

// Fetch handler with network-first strategy for HTML and cache-first for assets
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Network-first strategy for main document / HTML requests
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    
    console.log('[ServiceWorker] HTML fetch (network-first):', requestUrl.pathname);
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first for assets
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request.clone())
          .then((response) => {
            // Don't cache non-success responses or non-GET requests
            if (!response || response.status !== 200 || event.request.method !== 'GET') {
              return response;
            }

            // Cache successful responses
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('[ServiceWorker] Fetch error:', error);
            // You may want to return a custom offline page here
            return new Response('Erro de conexão. Verifique sua internet.');
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
