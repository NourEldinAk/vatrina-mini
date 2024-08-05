'use client'
import React, { useEffect, useState } from 'react'
import EmptyCart from '@/components/EmptyCart'
import CartItem from '@/components/CartItem'
import {useSelector} from 'react-redux'

function Page() {
  const items = useSelector(store => store.cart.items)
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    let total =0;
     items.forEach(item => total += (item.price*item.quantity));
    setTotal(total)
  },[total,items])
  return (
    <div className='h-full w-full'>
      <div className='flex-col bg-[#f6f6f6] opacity-75 text-white md:w-[60%] mx-auto  mt-12 rounded-md py-6'>
      <div className='mt-12  flex items-center'>
      <h1 className=' text-primary md:text-4xl font-bold px-10 text-2xl'>سلة التسوق</h1>
      </div>
      {items.length<1?(
        <EmptyCart/>
      ):
      <>
      <CartItem/>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>الاجمالي</p>
        <p>{total} د.ل</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">سيتم حساب سعر التوصيل في الخطوة التالية</p>
      <div className="mt-6">
        <a
          href="#"
          className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-75"
        >
          تأكيد الشراء
        </a>
      </div>
      </div>
      </>
      }

      </div>
    </div>
  )
}

export default Page
