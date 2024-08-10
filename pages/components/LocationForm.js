import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from '../../styles/Form.module.css';
import axios from 'axios';

const LocationForm = (params) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('ليبيا');
    const [selectedCity , setSelectedCity] = useState('')
    const [selectedDistrict , setSelectedDistrict] = useState('')



    useEffect(()=>{
        axios.get('https://api.vetrinas.ly/deliveryOptions')
        .then(response=>{
            const countryOptions = response.data.countries.map(country=>({
                label: country.name,
                value:country.name
            }))
            setCountries(countryOptions)
        }).catch(err=>console.error(err))
    },[])

  



    useEffect(() => {
        if (selectedCountry === 'ليبيا') {
            axios.get('https://api.vetrinas.ly/deliveryOptions')
            .then(response => {
              const cityOptions = response.data.cities.map(city => ({
                  label: city.name,
                  value: city.name
              }));
              setCities(cityOptions);
          })
            .catch(err => console.error(err));
        } else {
            setCities([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
      if (selectedCountry === 'ليبيا' && selectedCity) {
          axios.get('https://api.vetrinas.ly/deliveryOptions')
              .then(response => {
                  const city = response.data.cities.find(city => city.name === selectedCity);
                  if (city && city.districts) {
                      const districtOptions = city.districts.map(district => ({
                          label: district.name,
                          value: district.name
                      }));
                      setDistricts(districtOptions);
                  } else {
                      setDistricts([]);
                  }
              })
              .catch(err => console.error(err));
      } else {
          setDistricts([]);
      }
  }, [selectedCity, selectedCountry]);
  
  return(
  <Formik
    initialValues={{  country: 'ليبيا', city: '', address: '' }}
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
      if(!values.district && districts.length>0){
        errors.district = 'ادخل المنطقة'
      }
      return errors;
    }}
    onSubmit={(values,{ setSubmitting }) => {
      params.onNext();
      setSubmitting(false);
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
                setFieldValue('country', country);
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
            onChange ={e=>{
              const city = e.target.value
              setFieldValue('city',city)
              setSelectedCity(city)
            }}
          >
            <option value="">اختر المدينة</option>
            {cities.map((city,index)=>(
                <option value={city.value} key={index}>{city.label}</option>
            ))}
          </Field>

          <ErrorMessage name="city" component="div" className='text-red-500 text-sm mt-2'
          
          />
        </div>

        {values.city && districts.length>0 && 
        <div className={styles.fieldContainer}>
          <Field
            type="text"
            name="district"
            className="px-2 py-4"
            placeholder=" "
            as="select"
            onChange={e=>{
              const district = e.target.value;
              setFieldValue('district',district)
              setSelectedDistrict(district)
            }}
          >
          <option value="">اختر المنطقة</option>
          {districts.map((district,index)=>(
            <option value={district.value} key={index}>{district.label}</option>
          ))}
          </Field>
          <ErrorMessage name="district" component="div" className='text-red-500 text-sm mt-2' 
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
        <button  type="submit" className='"flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75' style={{backgroundColor:params.styles.primary}} disabled={isSubmitting}>
          التالي
        </button>
      </Form>

    )}
  </Formik>
  );}

export default LocationForm;
