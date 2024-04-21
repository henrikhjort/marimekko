import React from 'react';

type OrderButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
}

const OrderButton: React.FC<OrderButtonProps> = ({ children, onClick }) => {
  return (
    <button 
      className="flex flex-col items-center justify-center bg-brand-black md:w-80 h-14 p-2"
      onClick={onClick}
    >
      <span
        className="text-brand-white text-bold uppercase text-lg tracking-wide cursor-pointer"
      >
        {children}
      </span>
    </button>
  );
};

export default OrderButton;
