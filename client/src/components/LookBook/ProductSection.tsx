import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@mantine/core';

import Grid from './Grid';
import ProductContent from './ProductContent';

import type BrandImage from '../../../types/BrandImage';
import type { Product } from '@/context/ProductContext';

type ProductSectionProps = {
  product: Product;
  images: BrandImage[];
  headingText: string;
  paragraphText: string;
}

/**
 * Product section component.
 * A product section contains a grid with images and marketing text on the left side,
 * and product content with an image on the right side.
 * 
 * Props:
 *  - product: Product object (name, category, description, productId, priceVat0Euro, description)
 *  - images: array of images related to this product id (src, alt, productId) objects
 *  - headingText: marketing heading text used in the grid
 *  - paragraphText: marketing paragraph text used in the grid
 * Usage:
    <ProductSection
      key={product.productId}
      product={product}
      images={images}
      headingText="This is a heading text."
      paragraphText="This is a paragraph text."
    />
 */
const ProductSection: React.FC<ProductSectionProps> = ({ product, images, headingText, paragraphText }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<BrandImage | null>(null);

  function handleImageClick (index: number) {
    setModalImage(images[index]);
    setModalOpen(true);
  };

  function closeModal() {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <section className="lookbook-product-section flex md:flex-row flex-col-reverse w-full md:min-h-[calc(100vh-150px)] md:space-x-4">
      {/* Left (Mobile second) side 1/2 width */}
      {/* Image grid and marketing text */}
      <div className="left-part flex md:flex-row flex-col flex-1 w-full">
        <Grid
          product={product}
          images={images}
          headingText={headingText}
          paragraphText={paragraphText}
          handleImageClick={handleImageClick}
        />
      </div>
      {/* ---------------------------------- */}
      {/* Right (Mobile first) side 1/2 width */}
      {/* Image grid and marketing text */}
      <div className="right-part flex flex-1 w-full">
        <ProductContent product={product} image={images[1]} handleImageClick={handleImageClick} />
      </div>
      {/* Image modal */}
      <Modal
        opened={modalOpen}
        onClose={closeModal}
        size="auto"
        centered
        withCloseButton={true}
      >
        <div className="min-h-100vh">
          {modalImage && (
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              width={1200}
              height={1200}
            />
          )}
        </div>
      </Modal>
    </section>
  );
};

export default ProductSection;
