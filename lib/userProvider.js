import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';





export const fetchUser = async  ({email,password})=>{
        await axios.post(`${process.env.BACKEND_URL}/api/auth/login`,{
            email:email,
            password:password
        }).then(response=>{
            console.log(response)
            sessionStorage.setItem('vatrinaUser',JSON.stringify(response.data?.user))
            sessionStorage.setItem('vatrinaJwt',response.data?.token)

            toast('قيد التسجيل')

        }).catch(err=> {
            const errorMessage = err.response.data.message || 'يوجد خطأ حاول مجددا في وقت اخر'
            toast(errorMessage)
        } ) 
    }
    
export const postUser = async (userData)=>{

    await axios.post(`${process.env.BACKEND_URL}/api/auth/register`,{
            name: userData.name,
            email : userData.email,
            password:userData.password,
            phone:userData.phone

        }).then(response=>{
            console.log(response)
            sessionStorage.setItem('vatrinaUser',JSON.stringify(response.data?.user))
            sessionStorage.setItem('vatrinaJwt',response.data?.token)
            toast('قيد التسجيل ')
        }).catch(err=> {
            const errorMessage = err.response.data.message || 'يوجد خطأ حاول مجددا في وقت اخر'
            toast(errorMessage)        } ) 
        
    

}
