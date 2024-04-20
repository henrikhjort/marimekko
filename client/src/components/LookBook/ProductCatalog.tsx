"use client";
import React from 'react';

import { useProducts } from '@/context/ProductContext';
import { getImagesForProduct } from './images';
import ProductSection from './ProductSection';

const ProductCatalog: React.FC= () => {
  const { products } = useProducts();
  if (!products || products.length === 0) {
    return null;
  }

  // Iterate over products and render ProductSection for each
  // Set heading and paragraph text for first product
  return <div className="flex flex-col space-y-8 w-full md:px-8 px-2">
    {products.map((product, index) => {
      const images = getImagesForProduct(product.productId);
      return (
        <ProductSection
          index={index}
          key={product.productId}
          product={product}
          images={images}
          headingText={index === 0 ? 'Inspired by Unikko and monumentalism' : undefined}
          paragraphText={index === 0 ? 'The year 2024 marks the 60th anniversary of Unikko, one of the most recognized Marimekko print designs in the world. Unikko was created by Maija Isola for Marimekko in 1964 and has since become an international icon of print design.' : undefined}
        />
      );
    })}
  </div>;
};

export default ProductCatalog;
