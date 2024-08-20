import { fetchStyles } from '@/utils/getStyles'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Field, Form, Formik } from 'formik'
import formStyles from '../../styles/Form.module.css';
import * as Yup from 'yup'
import { useRouter } from 'next/navigation';
import { fetchUser,postUser } from '@/lib/userProvider';
import 'react-toastify/dist/ReactToastify.css';

import { Bounce, ToastContainer } from 'react-toastify';
export async function getServerSideProps(){
    const {styles , siteName} = await fetchStyles()
    return {
        props:{
            styles,
            siteName
        }
    }
}

function Index({styles, siteName}) {
  const [formType, setFormType] = useState('LogIn');

    const loginValidationSchema = Yup.object({
      email: Yup.string().required('يجب ادخال البريد الاكتروني').email('بريد الالكتروني غير صحيح'),
      password: Yup.string('ادخل كلمة المرور').required('يجب ادخال كلمة المرور')
           })
    const registerValidationSchema = Yup.object({
      name: Yup.string('ادخل الاسم').required('يجب ادخال الاسم').max(30),
      email:Yup.string('ادخل الايميل').email('بريد الالكتروني غير صالح').required('يجب ادخال البريد الالكتروني'),
      phone: Yup.string()
      .required('يجب ادخال رقم الهاتف')
      .matches(/^\+?\d+$/, 'يجب ادخال رقم صحيح')
      .min(9, 'رقم الهاتف غير صحيح'),
      password: Yup.string().required('يجب ادخال كلمة المرور').min(8,'يجب ان تتكون كلمة المرور من 8 احرف علي الاقل'),
      confirmPassword: Yup.string().required('يجب ادخال كلمة المرور مرة اخرى')
      .oneOf([Yup.ref('password'),null],'يجب ان تتطابق كلمات الامرور')

    })

    const router = useRouter()

    useEffect(()=>{
      const jwt = sessionStorage.getItem('vatrinaJwt')
      if(jwt){
        router.push('/')
      }
    },[router])

  return (
    <>
      <Layout styles={styles} siteName={siteName}/>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
          <h1 className='my-5 font-bold text-3xl'>
            {formType === 'LogIn' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>
          <Formik
            enableReinitialize
            initialValues={formType === 'LogIn' ?
               { email: '', password: '' } :
                { name: '', email: '', phone: '', password: '', confirmPassword: '' }}

            validationSchema={formType === "LogIn" ? loginValidationSchema : registerValidationSchema}
            async onSubmit={async (values) => {
              if (formType === "LogIn"){
                await fetchUser(values)
              }else{
                await postUser(values) 
              }

              const jwt = sessionStorage.getItem('vatrinaJwt');
              if (jwt) {
                router.push('/');
              }

            }}
          >
            {({errors,touched , resetForm}) => (
              <Form>
                {formType === 'LogIn' ? (
                  <>
                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>البريد الإلكتروني</label>
                      <Field id="email" name="email" type="email" autoComplete="email" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6' />
                      {errors.email && touched.email ? <div className="text-red-600 text-sm">{errors.email}</div> : null}

                    </div>
                    
                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>كلمة المرور</label>
                      <Field id="password" name="password" type="password" autoComplete="current-password" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'/>
                      {errors.password && touched.password ? <div className="text-red-600 text-sm">{errors.password}</div> : null}

                    </div>
                  </>
                ) : (
                  <>
                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>الاسم</label>
                      <Field id="name" name="name" type="text" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'/>
                      {errors.name && touched.name ? <div className="text-red-600 text-sm">{errors.name}</div> : null}

                    </div>

                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>البريد الإلكتروني</label>
                      <Field id="email" name="email" type="email" autoComplete="email" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6' />
                      {errors.email && touched.email ? <div className="text-red-600 text-sm">{errors.email}</div> : null}

                    </div>

                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>الهاتف</label>
                      <Field id="phone" name="phone" type="tel" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'/>
                      {errors.phone && touched.phone ? <div className="text-red-600 text-sm">{errors.phone}</div> : null}

                    </div>

                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>كلمة المرور</label>
                      <Field id="password" name="password" type="password" autoComplete="new-password" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'/>
                      {errors.password && touched.password ? <div className="text-red-600 text-sm">{errors.password}</div> : null}

                    </div>

                    <div className={`${formStyles.fieldContainer} flex flex-col gap-2`}>
                      <label className='text-gray-400'>تأكيد كلمة المرور</label>
                      <Field id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'/>
                      {errors.confirmPassword && touched.confirmPassword ? <div className="text-red-600 text-sm">{errors.confirmPassword}</div> : null}

                    </div>
                  </>
                )}

                <div className='flex flex-col gap-5'>
                  <button type="submit" className="flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 hover:opacity-65 shadow-lg" style={{ backgroundColor: styles.primary }}>
                    {formType === 'LogIn' ? 'تسجيل الدخول' : 'إنشاء حساب'}
                  </button>
                  
                  {formType === 'LogIn' ? (
                    <button type="button" onClick={() =>{
                       setFormType('Register')
                       resetForm()
                       } } className="flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-gray-600 hover:opacity-65 shadow-lg bg-slate-100">
                      إنشاء حساب
                    </button>
                  ) : (
                    <button onClick={()=>{
                      setFormType('LogIn') 
                       resetForm()
                    }} className="flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-gray-600 hover:opacity-65 shadow-lg bg-slate-100">
                      العودة إلى تسجيل الدخول
                    </button>
                  )}
                    <ToastContainer 
                    
                    position="bottom-right"
                    autoClose={3000}
                    transition={Bounce}

                    hideProgressBar={false}
                    closeOnClick  
                    theme="dark"
                    />

                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default Index;
