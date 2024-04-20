"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@mantine/core';

import type { Product } from '@/context/ProductContext';
import type BrandImage from '../../../types/BrandImage';
import ImageGrid from './ImageGrid';
import Heading from '../basic/Heading';

type ProductSectionProps = {
  index?: number;
  product: Product;
  images: BrandImage[];
  headingText?: string;
  paragraphText?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ index, product, images, headingText, paragraphText }) => {
  if (images.length !== 5) {
    throw new Error('ProductSection requires 5 images');
  }
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

  // Alternate left and right side based on index
  const isEven = index !== undefined && index % 2 === 0;

return (
    <section className={`lookbook-product-${product.productId} flex flex-col w-full h-[calc(100vh-250px)]`}>
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
      <div className={`lookbook-content-rows flex ${isEven ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'} w-full h-full`}>
        <div className="lookbook-content-left flex flex-1 items-center justify-center">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col h-full">
              <ImageGrid images={images} handleImageClick={handleImageClick} />
            </div>
            {headingText && paragraphText && (
              <div className="flex flex-col py-4 justify-end p-2 m-2 space-y-2">
                <Heading bold="bold" level={4}>{headingText}</Heading>
                <p className="max-w-xl text-left">{paragraphText}</p>
              </div>
            )}
          </div>
        </div>
        <div className="lookbook-content-right md:flex hidden flex-1">
          <div onClick={() => handleImageClick(0)} className="relative flex flex-col grow cursor-pointer">
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
