import React from 'react';

import Heading from '../basic/Heading';
import InStock from './InStock';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-brand-white text-brand-black font-sans w-full py-14 px-4">
      <div className="text-center space-y-8 w-full">
        <Heading level={4} capitalize>Collection Lookbook</Heading>
        <Heading level={1} bold="extrabold">Pre-Spring 24 Fashion</Heading>
        <InStock
          startDate='Jan 10'
          endDate='Feb 15'
          samplesAvailableStartDate='Dec 1'
          samplesAvailableEndDate='Dec 30'
        />
      </div>
    </div>
  );
};

export default Header;
