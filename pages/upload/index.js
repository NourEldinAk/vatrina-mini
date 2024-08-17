import { fetchStyles } from '@/utils/getStyles'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export async function getServerSideProps(){
    const { styles , siteName} = await fetchStyles()
    return{
        props:{
            styles,
            siteName
        }
    }
}

function Index({styles,siteName}) {

const [file,setFile] = useState(null)
const [fileName, setFileName] = useState('لم يتم اختيار ملف بعد');

const handleFileChange = (e)=>{
        const selectedFile = e.target.files[0]
        console.log(selectedFile)
        setFile(selectedFile)
        setFileName(selectedFile? selectedFile.name : 'No file selected')
    }
const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!file){
        toast('قم بادخال الملف')
        return
    }

    const formData = new FormData()
    formData.append('files', file)
    console.log(sessionStorage.getItem('vatrinaJwt'))

    try{
    const response =  await axios.post(`${process.env.STRAPI_URL}/api/upload`,formData,{
        headers:{
            'Content-Type' : 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('vatrinaJwt')}`
        }
        
    })
    toast('تم ارسال الملف')
    setFile(null)
    setFileName('لم يتم اختيار الملف بعد')
    console.log('File Uploaded: ', response.data)
    }catch(err){
        console.error("Error: ",err)
        toast(err.message)
        console.log(sessionStorage.getItem('vatrinaJwt'))

    }
    }


  return (
    <Layout styles={styles} siteName={siteName}>
    <div className='md:w-1/2  flex py-6 px-10 bg-gray-300 items-center justify-center mx-auto mt-20'>
      <form onSubmit={handleSubmit} className='flex gap-4 w-full'>
      <label
          htmlFor="file-upload"
          className=" w-1/2 text-sm text-gray-500 cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-500
              hover:file:bg-green-100 file:cursor-pointer
            "

        >
          <span className="inline-block px-4 py-2 bg-green-50 text-green-500 rounded-full ml-5">
            اختيار الملف
          </span>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
          />
        <span className="text-sm text-gray-600">{fileName}</span>

         </label> 
        <button className='bg-primary  hover:bg-orange-400 rounded-lg text-white py-1 px-4 font-semibold'  type='submit'>ارسال الملف </button>
        </form>
    </div>
    <ToastContainer 
                    position="bottom-right"
                    autoClose={3000}

                    hideProgressBar={false}
                    closeOnClick  
                    theme="dark"
                    />    
                    </Layout>
  )
}

export default Index
