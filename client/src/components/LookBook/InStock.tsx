import React from 'react';
import Separator from '../basic/Separator';

type InStockProps = {
  startDate: string;
  endDate: string;
  samplesAvailableStartDate: string;
  samplesAvailableEndDate: string;
};

const InStock: React.FC<InStockProps> = ({ startDate, endDate, samplesAvailableStartDate, samplesAvailableEndDate }) => {
  return (
    <div className="bg-brand-white flex flex-row w-full items-center">
      <Separator hideOnMobile={true} />
      <div className="flex flex-col md:w-1/2 w-full">
        <span>IN-STOCK: <span className='font-bold'>{startDate}</span> - <span className='font-bold'>{endDate}</span></span>
        <span>Samples available to order*: <span className='font-bold'>{samplesAvailableStartDate}</span> - <span className='font-bold'>{samplesAvailableEndDate}</span></span>
      </div>
      <Separator hideOnMobile={true} />
    </div>
  );
};

export default InStock;
