
import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  type = "button", 
  className = "" 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-traingo-primary hover:bg-yellow-300 text-black font-semibold 
        py-4 px-10 rounded-xl shadow-lg text-lg 
        transition-all duration-300 ease-in-out transform 
        hover:scale-105 active:scale-95
        ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
