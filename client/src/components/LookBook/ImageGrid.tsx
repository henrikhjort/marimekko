"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import type BrandImage from '../../../types/BrandImage';
import './lookbook.css';

type ImageGridProps = {
  images: BrandImage[];
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  if (images.length !== 5) {
    throw new Error('ImageGrid requires 5 images');
  }

  return (
    <div className="flex flex-row grow">
      <div className="relative flex flex-col grow">
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
        <div className="relative flex flex-row grow">
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
          <div className="relative flex flex-col grow">
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
          <div className="relative flex flex-col grow">
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
