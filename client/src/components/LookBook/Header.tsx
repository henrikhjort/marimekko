import React from 'react';

import Heading from '../basic/Heading';
import InStock from './InStock';

type HeaderProps = {
  h4Title: string;
  h1Title: string;
};

/**
 * LookBook header component.
 * Renders a header with a H1 and H4 title and InStock component.
 * 
 * Props:
 *  - h4Title: Smaller title (first)
 *  - h1Title: Bigger title (second)
 * 
 * Usage:
 *  <Header h1Title="Pre-Spring 24 Fashion" h4Title="COLLECTION LOOKBOOK" />
 */
const Header: React.FC<HeaderProps> = ({ h1Title, h4Title }) => {
  return (
    <div className="flex flex-col items-center bg-brand-white text-brand-black font-sans w-full py-14 px-4">
      <div className="text-center space-y-8 w-full">
        <Heading level={4} capitalize>{h4Title}</Heading>
        <Heading level={1} bold="extrabold">{h1Title}</Heading>
        <InStock
          inStockStartDate='Jan 10'
          inStockEndDate='Feb 15'
          samplesAvailableStartDate='Dec 1'
          samplesAvailableEndDate='Dec 30'
        />
      </div>
    </div>
  );
};

export default Header;
