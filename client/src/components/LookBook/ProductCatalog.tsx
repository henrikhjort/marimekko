"use client";
import React from 'react';

import { useProducts } from '@/context/ProductContext';
import { getImagesForProduct } from './images';
import ProductSection from './ProductSection';
import Section from './Section';

const ProductCatalog: React.FC= () => {
  const { products } = useProducts();
  if (!products || products.length === 0) {
    return null;
  }

  const content = [
    {
      title: 'Inspired by Unikko and monumentalism',
      description: 'The year 2024 marks the 60th anniversary of Unikko, one of the most recognized Marimekko print designs in the world. Unikko was created by Maija Isola for Marimekko in 1964 and has since become an international icon of print design.'
    },
    {
      title: 'Capturing flowers in print',
      description: 'The founder of Marimekko, Armi Ratia, believed that it was not possible to faithfully capture the true essence of real flowers in print, which is why floral prints were earlier excluded from Marimekko collections.'
    },
    {
      title: 'An emblem of joy',
      description: `So, Maija Isola designed Unikko to be an abstraction of a flower rather than a photorealistic rendition. Today, Unikko is a powerful emblem of joy and creativity, seamlessly integrated into Marimekko's design identity.`
    }
  ]

  // Iterate over products and render ProductSection for each
  // Set heading and paragraph text for first product
  return <div className="flex flex-col space-y-8 w-full md:px-8 px-2">
    {/*<Section product={products[0]} images={getImagesForProduct(products[0].productId)} headingText={content[0].title} paragraphText={content[0].description}/>*/}
    {products.map((product, index) => {
      const images = getImagesForProduct(product.productId);
      return (
        <Section
          index={index}
          key={product.productId}
          product={product}
          images={images}
          headingText={content[index] !== undefined ? content[index].title : ''}
          paragraphText={content[index] !== undefined ? content[index].description : ''}
        />
      );
    })}
  </div>;
};

export default ProductCatalog;
