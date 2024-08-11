import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from '../../styles/Form.module.css';
import axios from 'axios';
import Select from 'react-select';
import { Autocomplete, TextField } from '@mui/material';
import { CheckoutContext } from '../checkout';

const LocationForm = (params) => {

    const {formData,setFormData} = useContext(CheckoutContext)
    const {locationInfo }= formData

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(locationInfo?.country || 'ليبيا');
    const [selectedCity, setSelectedCity] = useState(locationInfo?.city || '');




    useEffect(() => {
        axios.get('https://api.vetrinas.ly/deliveryOptions')
            .then(response => {
                const countryOptions = response.data.countries.map(country => ({
                    label: country.name,
                    value: country.name
                }));
                setCountries(countryOptions);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedCountry==='ليبيا') {
            axios.get('https://api.vetrinas.ly/deliveryOptions')
                .then(response => {
                    const cityOptions = response.data.cities.map(city => ({
                        label: city.name,
                        value: city.name
                    }));
                    setCities(cityOptions);
                    console.log(cities)
                })
                .catch(err => console.error(err));
        } else {
            setCities([]);
        }
    }, [selectedCountry]);

  

    useEffect(() => {
        if (selectedCountry === 'ليبيا') {
            axios.get('https://api.vetrinas.ly/deliveryOptions')
                .then(response => {
                    const city = response.data.cities.find(city => city.name === selectedCity.value);
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
    }, [selectedCity]);

    return (
        <Formik
            initialValues={{
              country: locationInfo?.country || 'ليبيا',
              city: locationInfo?.city||'',
              district:locationInfo?.district || '', 
              address: locationInfo?.address ||'' }}
            validate={values => {
                const errors = {};
                if (!values.country) {
                    errors.country = 'ادخل الدولة';
                }
                if (!values.city) {
                    errors.city = 'ادخل المدينة';
                }
                if (!values.address) {
                    errors.address = "ادخل العنوان";
                }
                if (!values.district && districts.length > 0) {
                    errors.district = 'ادخل المنطقة';
                }
                return errors;
            }}
            onSubmit={async(values, { setSubmitting }) => {

              setFormData({
                ...formData,
                locationInfo:{
                  ...formData.locationInfo,
                  ...values
                }
              })

              console.log(formData)
              setSubmitting(false);
              params.onNext();
            }}
        >
            {({ isSubmitting, values, errors, touched, setFieldValue }) => (
                <Form className='flex flex-col md:w-1/2 gap-4 text-bold text-gray-500'>
                    <div className={styles.fieldContainer}>
                        <Field name="country" >
                            {({ field }) => (
                                <Select
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    padding: '.5rem 0.5rem',
                                    backgroundColor: '#ebebed', 
                                    borderRadius: '4px', 
                                  }),
                                }}
                                    {...field}
                                    options={countries}
                                    onChange={option => {
                                        setFieldValue('country', option ? option.value : '');
                                        setSelectedCountry(option? option.value : '');
                                    }}
                                    value={countries.find(country => country.value === values.country)}
                                    placeholder="اختر الدولة"
                                    noOptionsMessage={() => "لا توجد خيارات"}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="country" component="div" className='text-red-500 text-sm mt-2' />
                    </div>

                    <div className={styles.fieldContainer}>

                      <Autocomplete
                      disablePortal
                      name="city"
                      options={cities}
                      value={values.city}
                      sx={{
                        width: '100%',
                        backgroundColor: '#ebebed', 
                        borderRadius: '4px',
                        padding: '1.3rem 0.5rem 0.8rem',}}
                      freeSolo
                      onChange={(event,value)=>{
                        setFieldValue('city',value? value : '')
                        setSelectedCity(value)
                      }}
                      onInputChange={(event,value)=>{
                        setFieldValue('city',value? value : '')
                      }}
                      renderInput={(params) =>
                                
                        <TextField 
                        name="city" {...params}
                          sx={{width:"100%"}}
                          // label="اختر المدينة" 
                          placeholder='اختر المدينة'
                          error={touched.city && !!errors.city}
                          />
                        
                        }
                      />
                        {/* <Field name="city">
                            {({ field }) => (
                                <Select
                                    {...field}
                                    options={cities}
                                    onChange={option => {
                                        setFieldValue('city', option ? option.value : '');
                                        setSelectedCity(option);
                                    }}
                                    value={cities.find(city => city.value === values.city)}
                                    placeholder="اختر المدينة"
                                    isDisabled={!selectedCountry}
                                    styles={{
                                      control: (provided) => ({
                                        ...provided,
                                        padding: '.5rem 0.5rem',
                                        backgroundColor: '#ebebed', 
                                        borderRadius: '4px', 
                                      }),
                                    }}
                                    noOptionsMessage={() => "لا توجد خيارات"}
                                />
                            )}
                        </Field> */}
                        <ErrorMessage name="city" component="div" className='text-red-500 text-sm mt-2' />
                    </div>

                    {values.city && districts.length > 0 &&
                        <div className={styles.fieldContainer}>
                            {/* <Field name="district">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        options={districts}
                                        onChange={option => setFieldValue('district', option ? option.value : '')}
                                        value={districts.find(district => district.value === values.district)}
                                        placeholder="اختر المنطقة"
                                        isDisabled={!selectedCity}
                                        styles={{
                                          control: (provided) => ({
                                            ...provided,
                                            padding: '.5rem 0.5rem',
                                            backgroundColor: '#ebebed', 
                                            borderRadius: '4px', 
                                          }),
                                        }}
                                        noOptionsMessage={() => "لا توجد خيارات"}
                                    />
                                )}
                            </Field> */}
                            <Autocomplete
                              disablePortal
                              id="district"
                              name="district"
                              options={districts}
                              value={values.district}
                              sx={{
                                width: '100%',
                                backgroundColor: '#ebebed', 
                                borderRadius: '4px',
                                padding: '1.75rem 0.5rem 0.8rem',}}
                              freeSolo
                              onChange={(event, value) => {
                                setFieldValue('district', value ? value : '');
                              }}
                              onInputChange={(event,value)=>{
                                setFieldValue('district',value? value : '')
                              }}
                              renderInput={(params) =>
                                
                              <TextField 
                              name="district" {...params}
                                sx={{width:"100%"}}
                                // label="اختر المنطقة" 
                                placeholder='اختر المنطقة'
                                error={touched.district && !!errors.district}
                                // helperText={touched.district && errors.district ? errors.district : ''}
                                />
                              
                              }
                            />
                            <ErrorMessage name="district" component="div" className='text-red-500 text-sm mt-2' />
                        </div>
                    }

                    <div className={styles.fieldContainer}>
                        <Field
                            name="address"
                            className="px-2 py-4"
                            placeholder=" "
                        />
                        <label htmlFor="address" className={styles.floatingLabel}
                            style={errors.address && touched.address ? { color: 'text-red-500' } : { color: 'black' }}
                        >
                            العنوان
                        </label>
                        <ErrorMessage name="address" component="div" className='text-red-500 text-sm mt-2' />
                    </div>

                    <hr className='border-t-2' />
                    <button
                        type="submit"
                        className='flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75'
                        style={{ backgroundColor: params.styles.primary }}
                        disabled={isSubmitting}
                    >
                        التالي
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LocationForm;
