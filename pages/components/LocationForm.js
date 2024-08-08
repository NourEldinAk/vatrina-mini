import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from '../../styles/Form.module.css';

const LocationForm = (params) => (
  <Formik
    initialValues={{  country: '', city: '', address: '' }}
    validate={values => {
      const errors = {};
      if (!values.country) {
        errors.country = 'Required';
      } else if (!values.city) {
        errors.city = 'city Required';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting,values }) => (
      <Form className='flex flex-col md:w-1/2  gap-4 text-bold'>
        <div className={styles.fieldContainer} >
          <Field
            type="text"
            name="country"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="country" className={styles.floatingLabel}>الدولة</label>
          <ErrorMessage name="country" component="div" />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            type="text"
            name="city"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="city" className={styles.floatingLabel}>المدينة</label>
          <ErrorMessage name="city" component="div" />
        </div>

        {values.city && 
        <div className={styles.fieldContainer}>
          <Field
            type="text"
            name="region"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="region" className={styles.floatingLabel}>المنطقة</label>
          <ErrorMessage name="region" component="div" />
        </div>}

        <div className={styles.fieldContainer}>
          <Field
            name="address"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="address" className={styles.floatingLabel}>العنوان</label>
          <ErrorMessage name="address" component="div" />
        </div>

        <hr className='border-t-2'/>
        <button onClick={params.onNext} type="submit" className='"flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75' style={{backgroundColor:params.styles.primary}} disabled={isSubmitting}>
          التالي
        </button>
      </Form>

    )}
  </Formik>
);

export default LocationForm;
