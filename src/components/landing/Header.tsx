
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <Logo size="medium" />
      <div className="flex space-x-2">
        <Link to="/login">
          <Button variant="ghost" size="sm">Entrar</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
