import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card'
import Categories from './components/Categories';
import Layout from './components/Layout';
import Link from 'next/link';
import { fetchStyles } from '@/utils/getStyles';

export async function getServerSideProps() {
  const {styles, siteName} = await fetchStyles()
  return {
    props:{
      styles,
      siteName
    }
  }
}


export default function Home({ styles, siteName }) {
  const [categories, setCategories] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    if (siteName) {
      console.log(`Site name: ${siteName}`);
    }
    if (styles.primary) {
      console.log('Primary color:', styles.primary);
    }
  }, [siteName, styles]);

  useEffect(() => {
    axios.get('https://api.vetrinas.ly/topCategories', {
      headers: {
        'Origin': 'https://nooreldin.vetrinas.ly',
      },
    })
    .then(response => {
      const categories = response.data.categories;
      const discounted = response.data.discount_products;
      const random_products = response.data.un_categorized_products;

      setCategories(categories);
      setDiscountProducts(discounted);
      setRandomProducts(random_products);
    })
    .catch(err => {
      console.error('Error while fetching:', err);
    });
  }, []);

  return (
    <Layout styles={styles} siteName={siteName}>
      <div className='mx-10 md:px-16 px-4 pb-10'>
        <div className='my-16 flex gap-10 text-center text-[#999]'>
          <Categories categories={categories} />
        </div>

        <div className='font-bold mb-10 justify-between flex text-[#ddb35f]'>
          <h1 className="md:text-3xl">تخفيضات</h1>
          <Link href='/discount' className='md:text-lg text-sm font-normal hover:cursor-pointer hover:underline'>عرض المزيد</Link>
        </div>

        <div className='flex md:flex-row flex-col gap-10'>
          {discountProducts.map((product) => (
            <Card key={product.id} id={product.id} color={product.variations[0]} price={product.price} oldPrice={product.price * 0.15} title={product.name} image={product.main_image} discount={true} />
          ))}
        </div>

        <div className='font-bold mb-10 justify-between flex text-[#ddb35f]'>
          <h1 className="md:text-3xl">منتجات اخرى</h1>
        </div>

        <div className='flex md:flex-row flex-col gap-10 flex-wrap'>
          {randomProducts.map((product) => (
            <Card key={product.id} id={product.id} color={product.variations[0]} price={product.price} title={product.name} image={product.main_image} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
