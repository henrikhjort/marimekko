import React from 'react';

type ButtonProps = {
  variant: 'black' | 'white';
  children: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  width?: number;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick, type = "button", width = 60 }) => {

  const background = variant === 'black' ? 'bg-brand-black' : 'bg-brand-white';
  const textColor = variant === 'black' ? 'text-brand-white' : 'text-brand-black';

  return (
    <button type={type} onClick={onClick} className={`${background} ${textColor} p-2 w-${width} h-10`}>
      {children}
    </button>
  )
};

export default Button;
