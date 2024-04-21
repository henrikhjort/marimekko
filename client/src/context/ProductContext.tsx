"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { getApiUrl } from '@/lib/helpers';

interface ProductContextType {
  products: Product[];
}

export type Color = {
  name: string;
  code: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  productId: string;
  priceVat0Euro: number;
  colors: Color[];
}

// Initialize context with default values and types
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ProductProvider component that wraps your app and provides a ProductContext
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  console.log('products:', products);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiUrl = getApiUrl();
        if (!apiUrl) {
          throw new Error('API URL is not set');
        }
        const res = await fetch(`${apiUrl}/products`);
        if (!res.ok) {
          console.log('Error fetching products:', res);
          return;
        }
        const result = await res.json();
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within an ProductProvider');
  }
  return context;
};
