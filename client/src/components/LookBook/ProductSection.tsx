"use client";
import React from 'react';
import Image from 'next/image';

import type { Product } from '@/context/ProductContext';
import type BrandImage from '../../../types/BrandImage';
import ImageGrid from './ImageGrid';
import Heading from '../basic/Heading';

type ProductSectionProps = {
  product: Product;
  images: BrandImage[];
  headingText?: string;
  paragraphText?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ product, images, headingText, paragraphText }) => {
  return (
    <section className={`lookbook-product-${product.productId} flex flex-col w-full h-[calc(100vh-250px)]`}>
      <div className="lookbook-content-rows flex flex-col md:flex-row w-full h-full">
        <div className="lookbook-content-left flex flex-1 items-center justify-center">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col" style={{ flexGrow: 8 }}>
              <ImageGrid images={images} />
            </div>
            {headingText && paragraphText && (
              <div className="flex flex-col py-4 justify-end">
                <Heading bold="semibold" level={5}>{headingText}</Heading>
                <p className="max-w-xl text-left">{paragraphText}</p>
              </div>
            )}
          </div>
        </div>
        <div className="lookbook-content-right flex flex-1">
          <div className="relative flex flex-col grow">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="absolute inset-0 p-2"
          />
        </div>
        </div>
      </div>
    </section>
  )
};



export default ProductSection;
