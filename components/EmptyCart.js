import Link from 'next/link'
import React from 'react'

function EmptyCart() {
  return (


      <div className=' w-full h-2/3 flex flex-col items-center gap-6 text-center text-2xl mb-60 mt-12'>
      <h2 className='w-1/3 text-black font-bold'>سلة التسوق فارغة</h2>
      <Link href="/" className='text-lg  px-6 rounded-md py-4  text-white
       bg-primary font-bold shadow-custom-bottom
       hover:shadow-none hover:opacity-45 hover:transition-all duration-500
       '> تصفح المنتجات</Link>
    </div>
    

  )
}

export default EmptyCart
