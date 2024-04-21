import React from 'react';

import type { Color } from '@/context/ProductContext';

type ColorPickerProps = {
  colors: Color[];
  selectedColor: Color;
  handleColorClick: (color: Color) => void;
}

/**
 * LookBook color picker component.
 * Render color selector with available colors.
 * Parent is responsible for changing images based on color.
 * 
 * Props:
 *  - colors: array of Color objects (name, code)
 *  - selectedColor: selected Color object (name, code)
 *  - handleColorClick: function to handle color click
 * 
 * Usage:
 * <ColorPicker selectedColor={selectedColor} colors={product.colors} handleColorClick={handleColorClick} />
 */
const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, colors, handleColorClick }) => {
  return (
    <div className="flex flex-col">
      <span className="text-brand-gray-400">Available colors</span>
      <div className="flex flex-row space-x-2 mt-2">
        {colors.map((color) => (
          <div
            key={color.code}
            className={`w-10 h-10 rounded-full cursor-pointer ${
              colors.length > 1 && selectedColor.code === color.code ? 'ring-2 ring-black' : ''
            }`}
            style={{ backgroundColor: color.code }}
            onClick={() => handleColorClick(color)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
