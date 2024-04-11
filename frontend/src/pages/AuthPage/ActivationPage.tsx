import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseUrl from '../../service/service';
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import { FaRegSadCry } from 'react-icons/fa';

const ActivationPage = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const {activation_token}= useParams();

    useEffect(()=>{
        if(activation_token){
            const activationAccount=async()=>{
                await axios.post(`${baseUrl}/user/activation`,{activation_token},{withCredentials:true})
                .then((res)=>{
                    console.log(res.data)
                    setTimeout(() => {
                        navigate('/')
                        window.location.reload()
                    }, 3000);
                }).catch((err)=>{
                    setError(true)
                    console.log(err)
                })
            }
            activationAccount()
        }
    },[])


  return (
    <div
    className='flex w-full h-screen justify-center items-center'
    >
       {
        error?(
            <div  className='flex flex-col items-center'>
                <div >
                <FaRegSadCry size={45} className='rounded-full text-purple-700' />
                </div>
                <h1 className='className="text-center mb-14 text-[25px] text-[#f10202a1]'>Your Token has Expired</h1>
            </div>
        ):(
            <div className='flex flex-col items-center'>
                <BsEmojiHeartEyesFill size={45} className='rounded-full text-purple-700' />
               <h5 className="text-center  text-[25px]">
               Your Account has created Successfully!
               </h5>
               <p className=' text-gray-700'>redirecting to home page</p>
            </div>
        )
       }
    </div>
  )
}

export default ActivationPage