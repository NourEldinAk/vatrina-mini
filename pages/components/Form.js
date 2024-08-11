import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/Form.module.css';
import axios from 'axios';
import { CheckoutContext } from '../checkout';



const FormHandler = (params) => {
    const [countryCodes, setCountryCodes] = useState([])
    const { formData, setFormData } = useContext(CheckoutContext);
    const {personalInfo} = formData

    useEffect(()=>{
        axios.get('https://restcountries.com/v3.1/all?fields=idd,name')
        .then(response => {
            const codes = response.data.map(country=>({
                country: country.name.common,
                code : `+${country.idd.root ? country.idd.root.replace('+',''): ''}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`
            })).filter(country=>country.code !== "+undefined")
        
            setCountryCodes(codes)
        }).catch(err=>console.error(err))
    },[])
  return (
  <Formik
    initialValues={{
      countryCode: personalInfo?.countryCode||'+218',
      phone: personalInfo?.phone,
      name: personalInfo?.name,
      notes: personalInfo?.notes }}
    validationSchema={Yup.object({
      phone: Yup.string().required('ادخل رقم الهاتف')
      .matches(/^\d+$/, 'يجب ادخال رقم صحيح')
      .min(9,'رقم الهاتف غير صحيح'),
      name: Yup.string().required('ادخل الاسم الكامل')
    })}
    onSubmit={async (values, { setSubmitting }) => {
      setFormData({
        ...formData,
        locationInfo: {
          ...formData.locationInfo,
            ...values
        }
      });
          params.onNext(); 
        setSubmitting(false);
      }}
  >
    {({ isSubmitting, values,touched,errors,setFieldValue}) => (
      <Form className='flex flex-col md:w-1/2  gap-4 text-bold text-black'>
        <div className={styles.fieldContainer} >
          <Field
            type="text"
            name="name"
            className="px-2 py-4 "
            placeholder=" "
          />
          <label htmlFor="name" style={touched.name && errors.name ? {color:'red'} :{ color:'black'}} className={`${styles.floatingLabel} `} >الاسم الكامل</label>
          
          <ErrorMessage component="div" name='name' className='text-red-500 text-sm mt-1'></ErrorMessage>

        </div>

        <div className="">
        <div className='flex items-center  text-black'>

          <div className={`${styles.fieldContainer} w-3/4`}>
            <Field
              type="text"
              name="phone"
              className="px-2 py-4"
              placeholder=" "
              maxLength="11"
            />
            
            <label htmlFor="phone" className={styles.floatingLabel} style={touched.phone && errors.phone ? {color:'red'} :{ color:'black'}} >رقم الهاتف</label>
         
          </div>
          <div className={`${styles.fieldContainer} border-r-2 border-gray-300 w-1/4`}>
            <Field as="select" name="countryCode" className="px-2 py-4"
            onChange={(e)=> {
              setFieldValue('countryCode',e.target.value)
            }}

            >
              {countryCodes.map((option,index) => (
                <option key={index} value={option.code}>
                  {option.country} ({option.code})
                </option>
              ))}
            </Field>
          </div>
          </div>
            <ErrorMessage component="div" name='phone'  className='text-red-500 text-sm'></ErrorMessage>

        </div>

        <div className={`${styles.fieldContainer}`}>
          <Field
            as="textarea"
            name="notes"
            className="px-2 py-4"
            placeholder=" "
            rows="5"
            style={{ resize: 'none' }}
          />
          <label htmlFor="notes" className={styles.floatingLabel}>ملاحظات</label>
        </div>


        <hr className='border-t-2'/>
        <button 
        // onClick={params.onNext}
        type="submit" className='"flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75' style={{backgroundColor:params.styles.primary}} disabled={isSubmitting}>
          التالي
        </button>
        
      </Form>

    )}
  </Formik>)
};

export default FormHandler;
