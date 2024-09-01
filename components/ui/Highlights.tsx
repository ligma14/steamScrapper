import React from 'react'
import ProductsList from './ProductList'

const highlights = () => {
  return (
    <section className='px-5 py-10 sm:px-10 relative'>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='text-3xl max-sm:text-2xl font-bold opacity-50'><h1>Most traded now</h1></div>
        <div className='flex text-[#8b79ff] opacity-80 hover:opacity-100 transition-all delay-50 duration-100 flex-row p-5 g-1 cursor-pointer'>
          <a href="">View in the market </a>
          <img src="/chevron-right.svg" className='opacity-80' alt="" />
        </div>
      </div>
      <div>
        <ProductsList />
      </div>
    </section>

  )
}

export default highlights