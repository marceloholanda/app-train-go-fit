
import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'filled';
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  onClick,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-traingo-gray',
    outline: 'bg-transparent border border-gray-700',
    filled: 'bg-traingo-primary/10'
  };

  return (
    <div 
      className={cn(
        'rounded-xl p-4 shadow-md transition-all',
        variantClasses[variant],
        onClick ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1 duration-200' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
