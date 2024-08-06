'use client'
import Card from './components/Card'
import Categories from './components/Categories'
import { useEffect, useState,createContext, useContext} from 'react';
import axios from '../utils/axiosInstance'

import Link from 'next/link';
// const StylesContext = createContext();
// export const useStyles = () => useContext(StylesContext);

export default function Home() {


  const [products , setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [randomProducts , setRandomProducts] = useState([])
  const [discountProducts, setDiscountProducts] = useState([])


  useEffect(()=>{
    axios.get('/topCategories')
    .then(response=>{
      const categories = response.data.categories
      const discounted = response.data.discount_products
      const random_products = response.data.un_categorized_products

      setCategories(categories)
      setDiscountProducts(discounted)
      setRandomProducts(random_products)
    }).catch(err=>{
      console.error('error while fetching..', err)
    })
  },[])
  
  useEffect(()=>{
    console.log(randomProducts)
  },[randomProducts])




  return (
    // <StylesContext.Provider value={{ styles, setStyles }}>

    <div >

    <div className='mx-10 md:px-16 px-4 pb-10' >

    <div className='my-16 flex gap-10 text-center text-[#999]'>
      <Categories categories={categories} />
    </div>


      <div 
      className='font-bold  mb-10 justify-between flex  text-[#ddb35f]'>
      <h1 className="md:text-3xl ">تخفيضات</h1>
      <Link href='/discount' className='md:text-lg text-sm font-normal hover:cursor-pointer hover:underline'>عرض المزيد</Link>
      </div>

      <div className='flex md:flex-row flex-col gap-10 '>
        {discountProducts.map((product)=>{
            return <Card key={product.id} id={product.id} color={product.variations[0]}  price={product.price} oldPrice={product.price *0.15} title={product.name} image={product.main_image}
             discount={true}/>

        })}
  
      </div>


      <div 
      className='font-bold  mb-10 justify-between flex  text-[#ddb35f]'>
      <h1 className="md:text-3xl ">منتجات اخرى</h1>
      </div>

      <div className='flex md:flex-row flex-col gap-10 flex-wrap '>
        {randomProducts.map((product)=>{
            return <Card key={product.id} id={product.id} color={product.variations[0]}  price={product.price} title={product.name} image={product.main_image}
             />

        })}
  
      </div>

    </div>
    </div>
    // </StylesContext.Provider>
  );
}
