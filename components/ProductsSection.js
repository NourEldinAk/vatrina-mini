import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

function ProductsSection({ title, items }) {



  return (
    <>
    <div className='mx-10 md:px-16 px-4 pb-10' >

      <div className='font-bold mb-10 justify-between flex text-[#ddb35f]'>
        <h1 className="md:text-3xl ">{title}</h1>
      </div>

      <div className='flex md:flex-row flex-col gap-10  flex-wrap'>
        {items && items.length > 0 ? (
            
          items.map((product) => (
            <Card 
            id={product.id} 
            color={product.color}
              key={product.id} 
              price={product.price} 
              title={product.name} 
              image={product.main_image}
            />
          ))
        ) : (
          <p>No products available.</p> 
        )}
      </div>
      </div>
    </>
  )
}

export default ProductsSection
