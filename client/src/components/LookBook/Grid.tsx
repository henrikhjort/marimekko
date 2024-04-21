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

/**
 * LookBook grid component.
 * Renders a grid with 4 images, a heading (H3) and a paragraph.
 * 
 * Props:
 *  - images: array of BrandImage (src, alt, productId) objects
 *  - headingText: heading content
 *  - paragraphText: paragraph below heading
 *  - product: Product object (name, category, description, productId, priceVat0Euro, description)
 *  - handleImageClick: function to open modal with image
 * 
 * Usage:
 * <Grid
    product={product}
    images={images}
    headingText="Heading level 3"
    paragraphText="This is a paragraph text."
    handleImageClick={handleImageClick}
 * />
 */
const Grid: React.FC<GridProps> = ({ images, product, headingText, paragraphText, handleImageClick }) => {

  return (
    <div className="marketing-grid flex flex-col w-full m-2 p-2">
      <div className="flex flex-col h-full w-full">
        <ImageGrid images={images} handleImageClick={handleImageClick} />
      </div>
      <div className="marketing-text flex flex-col py-4 justify-end space-y-2 m-2">
        <Heading bold="semibold" level={5}>{headingText}</Heading>
        <p className="text-left">{paragraphText}</p>
      </div>
    </div>
  );
};

export default Grid;
