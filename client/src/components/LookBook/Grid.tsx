import React from 'react';

import ImageGrid from './ImageGrid';
import Heading from '../basic/Heading';

import type BrandImage from '../../../types/BrandImage';
import type { Product } from '@/context/ProductContext';

type GridProps = {
  images: BrandImage[];
  headingText: string;
  paragraphText: string;
  product: Product;
  handleImageClick: (index: number) => void;
}

const Grid: React.FC<GridProps> = ({ images, product, headingText, paragraphText, handleImageClick }) => {

  return (
    <div className="marketing-grid flex flex-col w-full m-2 p-2">
      <div className="flex flex-col h-full w-full">
        <ImageGrid images={images} handleImageClick={handleImageClick} />
      </div>
      <div className="marketing-text flex flex-col py-4 justify-end space-y-2 m-2">
        <Heading bold="semibold" level={3}>{headingText}</Heading>
        <p className="text-left">{paragraphText}</p>
      </div>
    </div>
  );
};

export default Grid;
