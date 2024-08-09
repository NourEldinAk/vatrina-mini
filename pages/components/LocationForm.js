import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from '../../styles/Form.module.css';
import axios from 'axios';

const LocationForm = (params) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');


    useEffect(()=>{
        axios.get('https://restcountries.com/v3.1/all?fields=name')
        .then(response=>{
            const countryOptions = response.data.map(country=>({
                label: country.name.common,
                value:country.name.value
            }))
            setCountries(countryOptions)
        }).catch(err=>console.error(err))
    },[])


    // useEffect(() => {
    //     if (selectedCountry) {
    //         axios.get('http://api.geonames.org/searchJSON', {
    //             params: {
    //                 country: selectedCountry,
    //                 maxRows: 100,
    //                 username: "noekatsu"
    //             }
    //         })
    //         .then(response => {
    //             const cityOptions = response.data.geonames.map(city => ({
    //                 label: city.name,
    //                 value: city.name
    //             }));
    //             setCities(cityOptions);
    //         })
    //         .catch(err => console.error(err));
    //     } else {
    //         setCities([]);
    //     }
    // }, [selectedCountry]);
  return(
  <Formik
    initialValues={{  country: '', city: '', address: '' }}
    validate={values => {
      const errors = {};
      if (!values.country) {
        errors.country = 'ادخل الدولة';
      }
       
      if (!values.city) {
        errors.city = 'ادخل المدينة';
      }
      if (!values.address){
        errors.address = "ادخل العنوان"
      }
      if(!values.region){
        errors.region = 'ادخل المنطقة'
      }
      return errors;
    }}
    onSubmit={(values,{ setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting,values,errors,touched , setFieldValue}) => (
      <Form className='flex flex-col md:w-1/2  gap-4 text-bold text-gray-500'>
        <div className={styles.fieldContainer} >
          <Field
            type="text"
            name="country"
            className="px-2 py-4 text-gray-500"
            placeholder=" "
            as="select"

            onChange={e => {
                const country = e.target.value;
                setFieldValue('country', );
                setSelectedCountry(country);
            }}
          >
            <option value="">اختر الدولة</option>
            {countries.map((country,index)=>(
                <option value={country.value} key={index}>{country.label}</option>
            ))}
          </Field>
          <ErrorMessage name="country" component="div" className='text-red-500 text-sm mt-2' />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            type="text"
            name="city"
            className="px-2 py-4"
            placeholder=" "
            as="select"
          >
            <option value="">اختر المدينة</option>
            {cities.map((city,index)=>(
                <option value={city.value} key={index}>{city.label}</option>
            ))}
          </Field>

          <ErrorMessage name="city" component="div" className='text-red-500 text-sm mt-2'
          
          />
        </div>

        {values.city && 
        <div className={styles.fieldContainer}>
          <Field
            type="text"
            name="region"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="region" className={styles.floatingLabel}
        style={errors.region && touched.region? {color:'text-red-500'}  : {color:'black'}} 

          >المنطقة</label>
          <ErrorMessage name="region" component="div" className='text-red-500 text-sm mt-2' 
          />
        </div>}

        <div className={styles.fieldContainer}>
          <Field
            name="address"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="address" className={styles.floatingLabel}
                 style={errors.address && touched.address ? {color:'text-red-500'}  : {color:'black'}} 

          >العنوان</label>
          <ErrorMessage name="address" component="div"  className='text-red-500 text-sm mt-2'
          />
        </div>

        <hr className='border-t-2'/>
        <button onClick={params.onNext} type="submit" className='"flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75' style={{backgroundColor:params.styles.primary}} disabled={isSubmitting}>
          التالي
        </button>
      </Form>

    )}
  </Formik>
  );}

export default LocationForm;
