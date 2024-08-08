'use client';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import test_products from '../../utils/products'
import { decrementQty, incrementQty,deleteItem } from '@/stores/cart';


function CartItem() {
  const products = useSelector(store => store.cart.items)
  const dispatch = useDispatch()




  return (
          <div className="mt-8">
                    <div className="flow-root px-10  h-full">
                      <ul role="list" className="">
                        {products.map((product) => (
                          <li key={product.productId} className="md:flex flex-col md:flex-row  md:py-6 pb-6 mt-5 bg-[#ebecee] gap-12 rounded-md " >
                            <div className="h-24 w-24  flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                              <Image
                                // alt={product.image?.alt}
                                alt='image'
                                src={product.image?.url}
                                width={product.image?.width}
                                height={product.image?.height}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.title}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}د.ل</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                              </div>
                              
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">الكمية {product.quantity}</p>
                               
                          {/* Quantity function */}

                           <div className="flex items-center">
                            <button
                              onClick={()=> dispatch(decrementQty({ productId: product.productId }))}
                              className="px-4 py-2 border rounded-l-md bg-gray-600 hover:bg-gray-300"
                            >
                              -
                            </button>
                            <p className="px-4 py-2 border-t border-b border-gray-200 text-gray-800">{product.quantity}</p>
                            <button
                              onClick={()=> dispatch(incrementQty({ productId: product.productId }))}
                              className="px-4 py-2 border rounded-r-md bg-gray-600 hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>



                                <div className="flex">
                                  <button   onClick={()=> dispatch(deleteItem({ productId: product.productId }))}
                                   type="button" className=" ml-6 font-medium text-lg text-indigo-600 hover:text-indigo-500 ">
                                  <FontAwesomeIcon icon={faTrash} />           
                                  </button>
                                </div>
                              </div>
                            </div>

                          </li>
                        ))}
                      </ul>
                      
                    </div>
                    
                  </div>

  )
}

export default CartItem
