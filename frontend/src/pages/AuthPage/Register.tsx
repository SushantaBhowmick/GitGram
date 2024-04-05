import { FaFacebook, FaGithub, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";

const Register = () => {

    const [avatar,setAvatar]=useState(null)
    const handleInputChange =(e)=>{
        console.log(e)
        const file = e.target.files[0]
        setAvatar(file)
    }

  const loginHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
        
      {/* Login form */}
      <div className="flex flex-col gap-5 items-center justify-center border-[5px] border-gray-200 text-center min-h-screen px-5 md:px-0 w-full">
      <div className="flex items-center gap-3 ">
        <h1 className="text-[25px] font-bold">GitGram</h1>
        <FaGithub className="size-7 " />
        </div>
        <form
          action=""
          onSubmit={loginHandler}
          className="flex flex-col gap-7 justify-center items-center w-[80%] sm:w-[60%] md:w-[30%]"
        >
            <div className="flex flex-col items-center justify-center">
               {
                avatar? (
                   <div className=" w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
                     <img src={URL.createObjectURL(avatar)} alt="" className=" w-full h-full rounded-full object-cover" />
                   </div>
                ):(
                    <RxAvatar size={200} id="img"  />
                )
               }
                <label htmlFor="file-input"
                  className="items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input type="file" name="avatar" id="file-input"
                    accept=".jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                </label>
            </div>
          <Input className="h-[50px]" placeholder="Enter Your Name" />
          <Input className="h-[50px]" placeholder="Enter Your Email" />
          <Input className="h-[50px]" placeholder="Enter Your username" />
          <Input className="h-[50px]" placeholder="Enter Your Phone No" />
          <Input className="h-[50px]" placeholder="Enter Your Password" />
          <div className="flex flex-col w-full gap-4">
            <Button type="submit" className=" h-[45px] text-[18px]">Register</Button>
           
            <Link to={'/login'} className=" w-full">
            <Button className="h-[45px] w-full text-[18px]">Already have an account?<FaLongArrowAltRight /></Button>
            </Link>
            <Button className="h-[45px] text-[18px] flex gap-2"> <FaFacebook /> Login with FaceBook</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register