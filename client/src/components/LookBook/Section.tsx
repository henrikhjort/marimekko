import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@mantine/core';

import Grid from './Grid';
import ProductContent from './Product';

import type BrandImage from '../../../types/BrandImage';
import type { Product } from '@/context/ProductContext';

type SectionProps = {
  index?: number;
  product: Product;
  images: BrandImage[];
  headingText: string;
  paragraphText: string;
}

const Section: React.FC<SectionProps> = ({ index, product, images, headingText, paragraphText }) => {
  console.log(images);

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
    <section className="lookbook-product-section flex md:flex-row flex-col w-full md:h-[calc(100vh-150px)] md:space-x-4">
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
        withCloseButton={false}
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

export default Section;
