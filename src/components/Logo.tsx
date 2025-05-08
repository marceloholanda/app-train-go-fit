
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', withText = true }) => {
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
          className={sizeClasses[size] + " mr-2"}
        />
        {withText && (
          <span className="font-bold text-white text-xl">
            Train<span className="text-traingo-primary">GO</span>
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
