'use client'
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axiosInstance'
import ProductsSection from '@/pages/components/ProductsSection'
import { useRouter } from 'next/router'
function Category() {
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

    <ProductsSection title={Category.name} items={Category.products}/>
    </>
  )
}

export default Category
