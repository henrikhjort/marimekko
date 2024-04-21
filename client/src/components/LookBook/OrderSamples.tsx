import React from 'react';

type OrderSamplesProps = {
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Order samples component, styled for LookBook.
 * 
 * Props:
 *  - onClick: function to call when button is clicked
 *  - children: text
 * Usage:
    <OrderSamples onClick={() => alert('Not implemented')}>
      Order samples
    </OrderSamples>
 */
const OrderSamples: React.FC<OrderSamplesProps> = ({ children, onClick }) => {
  return (
    <button 
      className="
        flex
        flex-col
        items-center
        justify-center
        bg-brand-white
        hover:bg-brand-black
        text-brand-black
        hover:text-brand-white
        border-2
        border-brand-black
        md:w-80
        h-14
        p-2
        cursor-pointer
      "
      onClick={onClick}
    >
      <span
        className="text-bold uppercase text-lg tracking-wide"
      >
        {children}
      </span>
    </button>
  );
};

export default OrderSamples;
