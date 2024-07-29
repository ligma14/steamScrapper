'use client'

// TODO: Add GSAP animation for productCards 29.07

import React, { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';


interface Product {
  id: number;
  name: string;
  description: string;
  picUrl: string;
  itemLink: string;
  priceInfo: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  let startX: number;
  let isDown: boolean;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      isDown = true;
      containerRef.current.classList.add('active');
      startX = e.pageX - containerRef.current.offsetLeft;
      scrollLeft = containerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown = false;
    if (containerRef.current) {
      containerRef.current.classList.remove('active');
    }
  };

  const handleMouseUp = () => {
    isDown = false;
    if (containerRef.current) {
      containerRef.current.classList.remove('active');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 1.15; // Multiplied by a ScrollSpeed multiplier
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };


  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div 
    ref={containerRef}
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    className="scrollable-container products-list max-sm:flex-col overflow-x-scroll py-16 flex flex-row gap-3">
      {products.map((product) => (
        <ProductCard 
        id = {product.id}
        key = {product.id}
        itemLink = {product.itemLink} 
        name = {product.name} 
        description = {product.description} 
        picUrl = {product.picUrl}
        priceInfo = {product.priceInfo}
        />
      ))}
    </div>
  );
};

export default ProductsList;
