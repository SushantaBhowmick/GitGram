import { FaGithub, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/users/userSlice";
import store, { RootState } from "../../app/store";
import { useSelector } from "react-redux";


const LoginPage = () => {
    
const [emailOrUsername,setEmailOrUsername]=useState('');
const [password,setPassword]=useState('');
const {loading,isAuthenticated} = useSelector((state: RootState) => state.user);
const navigate = useNavigate()


const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  store.dispatch(loginUser({emailOrUsername,password}))
};


useEffect(()=>{
  if(isAuthenticated){
    navigate('/')
    console.log("first")
  }

},[isAuthenticated,navigate])
  return (
    <div>
        
      {/* Login form */}
      <div className="flex flex-col gap-20 items-center justify-center border-[5px] border-gray-200 text-center h-screen px-5 md:px-0 w-full">
      <div className="flex items-center gap-3 ">
        <h1 className="text-[25px] font-bold">GitGram</h1>
        <FaGithub className="size-7 " />
        </div>
        <form
          action=""
          onSubmit={loginHandler}
          className="flex flex-col gap-7 justify-center items-center w-[80%] sm:w-[60%] md:w-[30%]"
        >
          <Input required className="h-[50px]" placeholder="Enter Your Email,Username" value={emailOrUsername} onChange={(e)=>setEmailOrUsername(e.target.value)} />
          <Input required className="h-[50px]" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
          <div className="flex flex-col w-full gap-4">
            <Button disabled={loading} type="submit" className=" h-[45px] text-[18px]">Login</Button>
            <Link to={'/forgot_password'}className="text-[18px]  text-blue-400 font-bold">
              Forgotten Password ?
            </Link>
            <Link to={'/register'} className=" w-full">
            <Button className="h-[45px] w-full text-[18px]">Create Account<FaLongArrowAltRight /></Button>
            </Link>
            {/* <Button className="h-[45px] text-[18px] flex gap-2"> <FaFacebook /> Login with FaceBook</Button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
