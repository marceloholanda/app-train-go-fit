
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', withText = false }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };

  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/01192848-d3c4-42c7-995d-11f46e901611.png" 
          alt="TrainGO Logo" 
          className={sizeClasses[size]}
        />
      </div>
    </Link>
  );
};

export default Logo;
