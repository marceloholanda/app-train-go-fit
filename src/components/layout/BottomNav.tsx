
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/') return true;
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-black z-50 lg:hidden">
      <div className="flex items-center justify-around h-16">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-traingo-primary' : 'text-gray-400'
            }`
          }
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-traingo-primary' : 'text-gray-400'
            }`
          }
        >
          <User size={20} />
          <span className="text-xs mt-1">Perfil</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-traingo-primary' : 'text-gray-400'
            }`
          }
        >
          <Settings size={20} />
          <span className="text-xs mt-1">Config</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
