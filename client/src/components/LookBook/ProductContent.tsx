import React, { useState } from 'react';
import Image from 'next/image';

import Heading from '../basic/Heading';
import ColorPicker from './ColorPicker';
import OrderButton from './OrderButton';
import OrderSamples from './OrderSamples';
import { formatPrice } from '@/lib/helpers';

import type { Product, Color } from '@/context/ProductContext';
import type BrandImage from '../../../types/BrandImage';
import './lookbook.css';

type ProductContentProps = {
  product: Product;
  image: BrandImage;
  handleImageClick: (index: number) => void;
};

/**
 * LookBook Product content component.
 * Renders product title, category, price, description, order button and image.
 * 
 * Props:
 *  - product: Product object (name, category, description, productId, priceVat0Euro, description)
 *  - image: BrandImage object (src, alt, productId)
 *  - handleImageClick: function to open modal with image
 * 
 * Usage:
 *  <ProductContent product={product} image={image} handleImageClick={handleImageClick} />
 */
const ProductContent: React.FC<ProductContentProps> = ({ product, image, handleImageClick }) => {
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);

  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
    // TODO: Change images based on color
    // I just now realized that this logic should probably be in the parent component
  };

  return (
    <div className="product-container flex sm:flex-row flex-col m-2">
      <div onClick={() => handleImageClick(1)} className="product-image-wrapper relative flex flex-1 flex-col cursor-pointer m-2">
        <Image
          priority
          src={image.src}
          alt={image.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className='absolute inset-0 md:p-2'
        />
      </div>
      <div className="relative flex flex-1 flex-col justify-start m-2 space-y-2 md:pb-2">
        <div className="flex md:flex-1 flex-col justify-start space-y-4 mb-2">
          <Heading capitalize={true} level={2}>{product.name}</Heading>
          <span className="text-brand-gray-400">{product.category}</span>
          <Heading level={3}>{formatPrice(product.priceVat0Euro)}</Heading>
          <p>{product.description}</p>
          {product.colors.length > 0 && (
            <ColorPicker selectedColor={selectedColor} colors={product.colors} handleColorClick={handleColorClick} />
          )}
        </div>
        <OrderSamples onClick={() => alert('Not implemented')}>
          Request samples
        </OrderSamples>
        <OrderButton onClick={() => alert('Not implemented')}>
          Order
        </OrderButton>
      </div>
    </div>
  );
};

export default ProductContent;
