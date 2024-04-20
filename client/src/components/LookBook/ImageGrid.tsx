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
        <Image
          src={images[0].src}
          alt={images[0].alt}
          layout="fill"
          objectFit="cover"  // Use "cover" if you want the image to fill the entire div potentially cropping it
          className="absolute inset-0" // Positioning the image absolutely to fill the container
        />
      </div>
      <div className="flex flex-col grow bg-purple-300">
        {/* Other content or images */}
      </div>
    </div>
  );
};

export default ImageGrid;
