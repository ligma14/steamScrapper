import { color } from 'framer-motion';
import React from 'react';
import { useState } from 'react';

interface ProductCardProps {
    id: number;
    quality: string;
    name: string;
    description: string;
    picUrl: string;
    buyInfo: string;
    sellInfo: string;
    itemLink: string;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, picUrl, buyInfo, sellInfo, itemLink, className, quality}) => {
  return (
    <div className="product-card text-left flex flex-col gap-3 py-6 rounded-xl bg-[#151515] transition-all delay-100 duration-200 hover:scale-95">
        <div className='px-6 flex flex-col gap-1'>
            <a className='text-xl font-bold cursor-pointer' href={itemLink}>{name}</a>
            <p>{description}</p>
        </div>
        <div className={`max-sm:w-auto w-[350px] ${className}`}>
            <img src={picUrl}  alt="Loading.."/> 
        </div>
        <div className='px-6'>
            <p>Sell listings starting at ${sellInfo}</p>
            <p>Buy requests starting at ${buyInfo}</p>
        </div>
    </div>
  );
};

export default ProductCard;