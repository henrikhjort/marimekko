import React from 'react';
import Image from 'next/image';

import Heading from '../basic/Heading';
import OrderButton from './OrderButton';
import { formatPrice } from '@/lib/helpers';

import type { Product } from '@/context/ProductContext';
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
  return (
    <div className="product-container flex md:flex-row flex-col m-2">
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
        <div className="flex md:flex-1 flex-col justify-start space-y-2 mb-2">
          <Heading capitalize={true} level={2}>{product.name}</Heading>
          <span className="text-brand-gray-400">{product.category}</span>
          <Heading level={3}>{formatPrice(product.priceVat0Euro)}</Heading>
          <p>{product.description}</p>
        </div>
        <OrderButton onClick={() => alert('Not implemented')}>
          Order
        </OrderButton>
      </div>
    </div>
  );
};

export default ProductContent;
