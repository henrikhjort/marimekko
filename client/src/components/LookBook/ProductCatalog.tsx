"use client";
import React from 'react';

import { useProducts } from '@/context/ProductContext';
import { getImagesForProduct } from './images';
import ProductSection from './ProductSection';

const ProductCatalog: React.FC= () => {
  const { products } = useProducts();
  console.log('Products:', products);

  return <div className="flex flex-col space-y-8 w-full md:px-8 px-2">
    {products.map(product => {
      const images = getImagesForProduct(product.productId);
      return <ProductSection key={product.productId} product={product} images={images} />;
    })}
  </div>;
};

export default ProductCatalog;
