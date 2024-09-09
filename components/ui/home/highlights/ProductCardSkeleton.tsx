import React from 'react';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

const ProductCardSkeleton: React.FC = () => (
  <div className="product-card text-left flex flex-col max-sm:items-center gap-3 py-6 rounded-xl bg-[#151515]">
    <div className='px-6 flex flex-col gap-1'>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <Skeleton className="w-[350px] h-[350px]" />
    <div className='px-6'>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

export default ProductCardSkeleton;