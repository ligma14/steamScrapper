import React from 'react';

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    picUrl: string;
    priceInfo: string;
    itemLink: string
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, picUrl, priceInfo, itemLink }) => {
  return (
    <div className="product-card text-left flex flex-col gap-3 px-10 py-7 rounded-xl hover:bg-[#151515] transition-all delay-100 duration-200 hover:scale-105">
        <a className='text-xl font-bold cursor-pointer' href={itemLink}>{name}</a>
        <p>{description}</p>
        <div className='bg-[#151515] rounded-xl max-sm:w-auto w-[350px]'>
            <img src={picUrl}  alt="Loading.."/> 
        </div>
        <p>{priceInfo}</p>
    </div>
  );
};

export default ProductCard;
