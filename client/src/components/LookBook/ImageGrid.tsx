"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@mantine/core';

import type BrandImage from '../../../types/BrandImage';
import './lookbook.css';

type ImageGridProps = {
  images: BrandImage[];
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<BrandImage | null>(null);

  if (images.length !== 5) {
    throw new Error('ImageGrid requires 5 images');
  }

  function handleImageClick (index: number) {
    console.log(index);
    setModalImage(images[index]);
    setModalOpen(true);
  };

  function closeModal() {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="flex flex-row grow">
      <Modal
        opened={modalOpen}
        onClose={closeModal}
        size="auto"
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
      <div onClick={() => handleImageClick(0)} className="relative flex flex-col grow cursor-pointer">
        {/* Left big image */}
          <Image
            src={images[0].src}
            alt={images[0].alt}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="absolute inset-0 p-2"
          />
      </div>
      <div className="flex flex-col grow">
        <div onClick={() => handleImageClick(1)} className="relative flex flex-row grow cursor-pointer">
          {/* Right side top solo image */}
          <Image
            src={images[1].src}
            alt={images[1].alt}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="absolute inset-0 p-2"
          />
        </div>
        <div className="flex flex-row grow">
          {/* Bottom image pair */}
          <div onClick={() => handleImageClick(2)} className="relative flex flex-col grow cursor-pointer">
            {/* Bottom image 1 */}
            <Image
              src={images[2].src}
              alt={images[2].alt}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="absolute inset-0 p-2"
            />
          </div>
          <div onClick={() => handleImageClick(3)} className="relative flex flex-col grow cursor-pointer">
            {/* Bottom image 2 */}
            <Image
              src={images[3].src}
              alt={images[3].alt}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="absolute inset-0 p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
