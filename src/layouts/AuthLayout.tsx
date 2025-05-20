
import React from 'react';
import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom';
import { HomeIcon, UserIcon, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthLayout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Main content area */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-traingo-gray border-t border-gray-800 p-2 z-10">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg ${isActive ? 'text-traingo-primary' : 'text-gray-400'}`}
          >
            <HomeIcon size={24} />
            <span className="text-xs mt-1">Início</span>
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg ${isActive ? 'text-traingo-primary' : 'text-gray-400'}`}
          >
            <UserIcon size={24} />
            <span className="text-xs mt-1">Perfil</span>
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg ${isActive ? 'text-traingo-primary' : 'text-gray-400'}`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Config</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default AuthLayout;
