'use client';
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axiosInstance'
import ProductsSection from '@/pages/components/ProductsSection'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import  { fetchStyles } from '../../utils/getStyles'


export async function getServerSideProps() {
  const {styles , siteName} =  await fetchStyles()
  return {
    props:{
      styles,
      siteName,
    }
  }
}

function Category({styles,siteName}) {
  const router = useRouter()
  const {id} = router.query
  const [Category, setCategory] = useState([])

  useEffect(()=>{
    if(id){

      axios.get('/topCategories').then((response)=>{
        const categories = response.data.categories
        const foundCategory = categories.find((category) => category.id === parseInt(id, 10));
        setCategory(foundCategory)
      }).catch((error=>{
      }))
    }
  },[id])
  useEffect(()=>{
    console.log(Category.products)
  },[Category])

  return (
    <>
    <Layout styles={styles} siteName={siteName}>
    <ProductsSection title={Category.name} items={Category.products}/>
    </Layout>
    </>
  )
}

export default Category
