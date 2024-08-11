import React, { useContext } from 'react'
import { CheckoutContext } from '../checkout'


function PaymentForm({param}) {
  const {formData} = useContext(CheckoutContext) 
  const {personalInfo} = formData
  const {locationInfo} = formData

  return (
    <div className='w-1/2 flex flex-col gap-10'>
      <div className='text-gray-500 text-2xl'>
      <h1 className='text-3xl mb-5'>المعلومات الشخصية</h1>
      <p className=''>الاسم : {personalInfo.name}</p>
      <p className=''>الهاتف :{personalInfo.countryCode.replace('+','')}{formData.personalInfo.phone}+</p>
      <p className=''>الملاحظات : {personalInfo.notes}</p>
    </div>
    <div className='text-gray-500 text-2xl'>
      <h1 className='text-3xl mb-5'>العنوان </h1>
      <p className=''>الدولة : {locationInfo.country}</p>
      <p className=''>المدينة : {locationInfo.city.value}</p>
      <p className=''>المنطقة : {locationInfo.district.value  || ""}</p>
      <p className=''>العنوان : {locationInfo.address}</p>

    </div>
    <div className='text-gray-500 text-2xl'>
      <h1 className='text-3xl mb-5'>طريقة الشحن</h1>
      <p>غير متوفره الان</p>
    </div>
    </div>
  )
}

export default PaymentForm
