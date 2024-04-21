import React from 'react';

type OrderButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Order button component, styled for LookBook.
 * 
 * Props:
 *  - onClick: function to call when button is clicked
 *  - children: button text
 * Usage:
    <OrderButton onClick={() => alert('Not implemented')}>
      Order
    </OrderButton>
 */
const OrderButton: React.FC<OrderButtonProps> = ({ children, onClick }) => {
  return (
    <button 
      className="
        flex
        flex-col
        items-center
        justify-center
        bg-brand-black
        text-brand-white
        hover:opacity-80
        md:w-80
        h-14
        p-2
      "
      onClick={onClick}
    >
      <span
        className="text-bold uppercase text-lg tracking-wide cursor-pointer"
      >
        {children}
      </span>
    </button>
  );
};

export default OrderButton;
