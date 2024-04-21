import React from 'react';
import Separator from '../basic/Separator';

type InStockProps = {
  inStockStartDate: string;
  inStockEndDate: string;
  samplesAvailableStartDate: string;
  samplesAvailableEndDate: string;
};

/**
 * Component to display in-stock and samples available dates.
 * Takes dates as string, so whichever component uses this should format the dates.
 * 
 * Props:
 *  - inStockStartDate: start date of in-stock
 *  - inStockEndDate: end date of in-stock
 *  - samplesAvailableStartDate: start date of samples available
 *  - samplesAvailableEndDate: end date of samples available
 * 
 * Usage:
    <InStock
      inStockStartDate='Jan 10'
      inStockEndDate='Feb 15'
      samplesAvailableStartDate='Dec 1'
      samplesAvailableEndDate='Dec 30'
    />
 */
const InStock: React.FC<InStockProps> = ({ 
  inStockStartDate,
  inStockEndDate,
  samplesAvailableStartDate, 
  samplesAvailableEndDate 
}) => {
  return (
    <div className="bg-brand-white flex flex-row w-full items-center">
      <Separator hideOnMobile={true} />
      <div className="flex flex-col md:w-1/2 w-full">
        <span>IN-STOCK: <span className='font-bold'>{inStockStartDate}</span> - <span className='font-bold'>{inStockEndDate}</span></span>
        <span>Samples available to order*: <span className='font-bold'>{samplesAvailableStartDate}</span> - <span className='font-bold'>{samplesAvailableEndDate}</span></span>
      </div>
      <Separator hideOnMobile={true} />
    </div>
  );
};

export default InStock;
