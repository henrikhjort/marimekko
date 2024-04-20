"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import images from './images';
import './lookbook.css';

const ImageGrid: React.FC = () => {
  const imageCount = images.length;
  const maxCount = 5;

  // Display first 5 images initially.
  const [currentIndices, setCurrentIndices] = useState([0, 1, 2, 3, 4]);

  const [imageOpacity, setImageOpacity] = useState(Array(maxCount).fill(true));

  // Push each image forward by one every 5 seconds
  useEffect(() => {
    const getNextIndexSet = () => {
      return currentIndices.map(index => (index + 1) % imageCount);
    };

    const interval = setInterval(() => {
      setImageOpacity(prev => prev.map(() => false));
      setTimeout(() => {
        setCurrentIndices(getNextIndexSet());
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndices, imageCount]);


  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full w-full">
        <div className="relative col-span-2 row-span-3">
          <Image 
            width={300}
            height={400}
            className="w-full h-full top-0 left-0 object-cover"
            alt=""
            src={images[currentIndices[0]].src}
          />
        </div>
        <div className="relative col-span-2 row-span-2">
          <Image 
            width={300}
            height={200}
            className="w-full top-0 left-0 object-cover"
            alt=""
            src={images[currentIndices[1]].src}
          />
        </div>
        <div className="relative col-span-1 row-span-1">
          <Image 
            width={150}
            height={150}
            className="w-full top-0 left-0 object-cover"
            alt=""
            src={images[currentIndices[2]].src}
          />
        </div>
        <div className="relative col-span-1 row-span-1">
          <Image 
            width={150}
            height={150}
            className="w-full h-full top-0 left-0 object-cover"
            alt=""
            src={images[currentIndices[3]].src}
          />
        </div>
    </div>
  );
};

export default ImageGrid;
