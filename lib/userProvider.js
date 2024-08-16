import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';





export const fetchUser = async  ({email,password})=>{
        await axios.post(`${process.env.STRAPI_URL}/api/auth/local`,{
            identifier:email,
            password:password
        }).then(response=>{

            sessionStorage.setItem('vatrinaUser',JSON.stringify(response.data.user))
            sessionStorage.setItem('vatrinaJwt',response.data.jwt)

            toast('قيد التسجيل')

        }).catch(err=> toast(err?.response?.data?.error.message)) 
    }
    
export const postUser = async (userData)=>{

    await axios.post(`${process.env.STRAPI_URL}/api/auth/local/register`,{
            username: userData.name,
            email : userData.email,
            password:userData.password,

        }).then(response=>{
            sessionStorage.setItem('vatrinaUser',JSON.stringify(response.data.user))
            sessionStorage.setItem('vatrinaJwt',response.data.jwt)
            toast('قيد التسجيل ')
        }).catch(err=> {

            toast(err?.response?.error.message)

        }
        )
    

}
