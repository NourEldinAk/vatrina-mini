import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from '../../styles/Form.module.css';

const FormHandler = (params) => (
  <Formik
    initialValues={{  name: '', phone: '', notes: '' }}
    validate={values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Required';
      } else if (!values.phone) {
        errors.phone = 'Phone Required';
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
    {({ isSubmitting }) => (
      <Form className='flex flex-col md:w-1/2  gap-10 text-bold'>
        <div className={styles.fieldContainer} >
          <Field
            type="text"
            name="name"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="name" className={styles.floatingLabel}>الاسم الكامل</label>
          <ErrorMessage name="name" component="div" />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            type="text"
            name="phone"
            className="px-2 py-4"
            placeholder=" "
          />
          <label htmlFor="phone" className={styles.floatingLabel}>رقم الهاتف</label>
          <ErrorMessage name="phone" component="div" />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            as="textarea"
            name="notes"
            className="px-2 py-4"
            placeholder=" "
            rows="5"
            style={{ resize: 'none' }}
          />
          <label htmlFor="notes" className={styles.floatingLabel}>ملاحظات</label>
          <ErrorMessage name="notes" component="div" />
        </div>

        <hr className='border-t-2'/>
        <button onClick={params.onNext} type="submit" className='"flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75' style={{backgroundColor:params.styles.primary}} disabled={isSubmitting}>
          التالي
        </button>
      </Form>

    )}
  </Formik>
);

export default FormHandler;
