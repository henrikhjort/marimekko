import React from 'react';

import Heading from '../basic/Heading';
import OrderButton from './OrderButton';
import { formatPrice } from '@/lib/helpers';

import type { Product } from '@/context/ProductContext';

type ProductInfoProps = {
  product: Product;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="relative flex flex-col w-96 justify-start m-2">
      <div className="flex-1 flex flex-col justify-start space-y-2">
        <Heading capitalize={true} level={2}>{product.name}</Heading>
        <span className="text-brand-gray-400">{product.category}</span>
        <Heading level={3}>{formatPrice(product.priceVat0Euro)}</Heading>
        <p>{product.description}</p>
      </div>
      <OrderButton onClick={() => alert('Not implemented')}>
        Order
      </OrderButton>
    </div>
  );
};

export default ProductInfo;
