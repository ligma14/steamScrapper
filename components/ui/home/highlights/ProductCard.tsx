import React from 'react';
import Link from 'next/link';

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
    <div className="product-card text-left flex flex-col max-sm:items-center gap-3 py-6 rounded-xl card-secondary transition-all delay-100 duration-200 hover:scale-95">
        <div className='px-6 flex flex-col gap-1'>
            <a className='text-xl font-bold cursor-pointer' href={itemLink}>{name}</a>
            <p>{description}</p>
        </div>
        <div className={`w-[350px] ${className}`}>
            <Link href={itemLink}>
                <img src={picUrl}  alt="product_image" className=''/> 
            </Link>
        </div>
        <div className='px-6'>
            <p>Sell listings starting at {sellInfo}</p>
            <p>Buy requests starting at {buyInfo}</p>
        </div>
    </div>
  );
};

export default ProductCard;