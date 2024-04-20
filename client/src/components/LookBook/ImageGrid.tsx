"use client";
import React from 'react';
import Image from 'next/image';

import Heading from '../basic/Heading';

import type BrandImage from '../../../types/BrandImage';
import type { Product } from '@/context/ProductContext';
import './lookbook.css';

type ImageGridProps = {
  images: BrandImage[];
  handleImageClick: (index: number) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, handleImageClick }) => {
  if (images.length !== 5) {
    throw new Error('ImageGrid requires 5 images');
  }

  return (
    <div className="image-grid flex md:flex-row flex-col grow w-full">
      <div onClick={() => handleImageClick(0)} className="large-image product-image-wrapper-small relative md:flex flex-col grow cursor-pointer">
        {/* Left big image */}
          <Image
            priority
            src={images[0].src}
            alt={images[0].alt}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="absolute inset-0 p-2"
          />
      </div>
      <div className="small-images md:flex flex-col grow">
        <div onClick={() => handleImageClick(1)} className="relative md:flex hidden md:flex-row flex-col grow cursor-pointer">
          {/* Right side top solo image */}
          <Image
            priority
            src={images[1].src}
            alt={images[1].alt}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="absolute inset-0 p-2"
          />
        </div>
        <div className="flex md:flex-row flex-col grow">
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
