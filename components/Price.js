import React from 'react'

function Price({price,discount,oldPrice}) {
  return (
    <>
    {discount?(
        <div className='flex gap-2 text-sm' >
        <p className="line-through font-bold">{oldPrice} د.ل</p>
        <p className='text-red-500'> {price} د.ل</p>
        </div>
    ) : 
    (
        <p>{price} د.ل</p>)}
    </>
  )
}

export default Price
