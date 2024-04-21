import React from 'react';

type ButtonProps = {
  variant: 'black' | 'white';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  width?: number;
  disabled?: boolean;
}

/**
 * Generic button component.
 * 
 * Props:
 *  - variant: black | white
 *  - children: React.ReactNode
 *  - onClick: onClick event handler
 *  - type: button | submit | reset
 *  - width: tailwindcss width class value
 *  - disabled: boolean
 * 
 * Usage:
 * <Button
 *  variant="black"
 *  onClick={() => alert('Button clicked')}
 *  type="button"
 *  width={60}
 * >
 *  Click me
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({ variant, children, onClick, type = "button", width = 60, disabled }) => {

  const background = variant === 'black' ? 'bg-brand-black' : 'bg-brand-white';
  const textColor = variant === 'black' ? 'text-brand-white' : 'text-brand-black';

  return (
    <button disabled={disabled} type={type} onClick={onClick} className={`${background} ${textColor} hover:opacity-80 p-2 w-${width} h-10`}>
      {children}
    </button>
  )
};

export default Button;
