'use client'
import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axiosInstance'
import ProductsSection from '@/components/ProductsSection'
function Category({params}) {
  const [Category, setCategory] = useState([])

  useEffect(()=>{
    axios.get('/topCategories').then((response)=>{
      const categories = response.data.categories
      const foundCategory = categories.find((category) => category.id === parseInt(params.id, 10));
      setCategory(foundCategory)
    }).catch((error=>{
      console.error("fetching failed...",error)
    }))
  },[])
  useEffect(()=>{
    console.log(Category.products)
  },[Category])

  return (
    <>

    <ProductsSection title={Category.name} items={Category.products}/>
    </>
  )
}

export default Category
