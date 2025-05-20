
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'

// Componente de erro para capturar falhas globais
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, errorMessage: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[TrainGO] Fatal error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 text-white">
          <div className="bg-red-900/30 border border-red-600 p-6 rounded-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Erro Crítico no TrainGO</h1>
            <p className="mb-4">Ocorreu um erro que impediu o carregamento da aplicação:</p>
            <div className="bg-black/30 p-3 rounded mb-4 font-mono text-sm overflow-auto">
              {this.state.errorMessage || "Erro desconhecido"}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Recarregar Aplicativo
            </button>
            <p className="mt-4 text-xs text-slate-400">Se o erro persistir, tente limpar o cache do navegador ou contacte o suporte.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Register service worker with improved error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

// Função para iniciar a aplicação com tratamento de erros
const startApp = () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Elemento root não encontrado");
    }
    
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <Router>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Router>
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log("[TrainGO] Application successfully rendered");
  } catch (error) {
    console.error("[TrainGO] Error starting application:", error);
    
    // Renderizar uma mensagem de erro diretamente
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; height: 100vh; align-items: center; justify-content: center; background: #1a1a1a; color: white; padding: 20px;">
          <div style="max-width: 500px; text-align: center;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Erro ao Iniciar o TrainGO</h1>
            <p>Não foi possível carregar a aplicação. Por favor, tente novamente mais tarde.</p>
            <p style="margin-top: 20px; font-family: monospace; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; overflow-wrap: break-word;">
              ${error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
            <button 
              onclick="window.location.reload()" 
              style="margin-top: 20px; background: #e53e3e; border: none; color: white; padding: 10px 20px; border-radius: 4px; cursor: pointer;"
            >
              Recarregar Aplicativo
            </button>
          </div>
        </div>
      `;
    }
  }
};

// Iniciar a aplicação
startApp();
