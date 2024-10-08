'use client'
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axiosInstance'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { fetchStyles } from '@/utils/getStyles'

export async function getServerSideProps(){
  const {styles , siteName} = await fetchStyles()
  return {
    props:{
      styles,
      siteName
    }
  }
}

function Page({styles,siteName}) {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get('/topCategories').then((response)=>{
            const discount = response.data.discount_products
            setProducts(discount)
            console.log(products)
        }).catch((err)=>{
            console.error(err)
        })
    },[products])
  return (
    <>
    <Layout styles={styles} siteName={siteName}>
    <div className='mx-10 md:px-16 px-4 pb-10 mt-10' >
            <div 
      className='font-bold  mb-10 justify-between flex  text-[#ddb35f]'>
      <h1 className="md:text-3xl ">تخفيضات</h1>
      </div>

      <div className='flex md:flex-row flex-col gap-10 '>
        {products.map((product)=>{
            return <Card key={product.id} id={product.id} color={product.color}  price={product.price} oldPrice={product.price *0.15} title={product.name} image={product.main_image}
             discount={true}/>

        })}
  
      </div>
    </div>
    </Layout>
    </>
  )
}

export default Page
