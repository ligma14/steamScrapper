'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  quality: string;
  name: string;
  buyInfo: string;
  sellInfo: string;
  description: string;
  picUrl: string;
  itemLink: string;
}

const ProductsList: React.FC = () => {  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch('api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      isDown.current = true;
      containerRef.current.classList.add('active');
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeft.current = containerRef.current.scrollLeft;
    }
  }, []);

  const handleMouseLeaveOrUp = useCallback(() => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.classList.remove('active');
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.15; // ScrollSpeed multiplier
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const getClassName = useCallback((quality: string): string => {
    return quality;
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
      className="scrollable-container products-list max-sm:flex-col overflow-x-scroll py-16 flex flex-row gap-4"
    >
      {loading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div>{error}</div>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard 
            id={product.id}
            key={product.id}
            itemLink={product.itemLink} 
            name={product.name} 
            description={product.description} 
            picUrl={product.picUrl}
            buyInfo={product.buyInfo}
            quality={product.quality}
            sellInfo={product.sellInfo}
            className={getClassName(product.quality)}
          />
        ))
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
};

export default ProductsList;


  