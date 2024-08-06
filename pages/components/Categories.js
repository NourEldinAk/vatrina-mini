import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function Categories({categories = []}) {
  return (
    <>
    {categories.filter(category => category.products && category.products.length > 0 ).map((category)=>{
      return(

    <Link href={`/categories/${category.id}`} className='flex-col opacity-100 hover:opacity-30 cursor-pointer transition-opacity duration-100 ' key={category.id}>
  <Image 
    src={category.image?.url} 
    className='rounded-md mb-4'
    // alt={category.image?.alt}
    alt='image'
    width={category.image?.width} 
    height={category.image?.height} 
    layout="responsive" 
  />      <label className="mt-10" >{category.name}</label>
    </Link>
      )


    })}
    </>
  );
}
