'use client';

import React, { useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '@/hooks/useProducts';

const ProductsList: React.FC = () => {  
  const { data, isLoading, isError, error } = useProducts(1, 5);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

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

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
      className="scrollable-container products-list max-sm:flex-col overflow-x-scroll py-16 flex flex-row gap-4"
    >
      {(data?.products?.length ?? 0) > 0 ? (
        data?.products?.map((product) => (
          <ProductCard 
            id={parseInt(product.steam_id)}
            key={product.steam_id}
            itemLink={product.item_link}
            name={product.name}
            description={product.description}
            picUrl={product.image_url}
            buyInfo={`$${product.buy_price.toFixed(2)}`}
            quality={product.quality}
            sellInfo={`$${product.sell_price.toFixed(2)}`}
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

