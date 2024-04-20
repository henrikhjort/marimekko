"use client";
import React from 'react';
import Image from 'next/image';

import type { Product } from '@/context/ProductContext';
import type BrandImage from '../../../types/BrandImage';
import ImageGrid from './ImageGrid';

type ProductSectionProps = {
  product: Product;
  images: BrandImage[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ product, images }) => {
  return (
    <section className={`lookbook-product-${product.productId} flex flex-col w-full bg-red-300 h-[calc(100vh-350px)]`}>
      <div className="lookbook-content-rows flex flex-col md:flex-row w-full h-full">
        <div className="lookbook-content-left flex flex-1 items-center justify-center">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col" style={{ flexGrow: 7 }}>
              <ImageGrid images={images} />
            </div>
            <div className="flex flex-col" style={{ flexGrow: 1 }}>
              <p className="m-auto">lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
            </div>
          </div>
        </div>
        <div className="lookbook-content-right flex flex-1 bg-purple-500">
          right
        </div>
      </div>
    </section>
  )
};



export default ProductSection;
