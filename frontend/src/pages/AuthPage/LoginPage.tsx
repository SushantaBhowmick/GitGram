import { FaFacebook, FaGithub, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      };
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
          <Input className="h-[50px]" placeholder="Enter Your Email" />
          <Input className="h-[50px]" placeholder="Enter Your Password" />
          <div className="flex flex-col w-full gap-4">
            <Button type="submit" className=" h-[45px] text-[18px]">Login</Button>
            <Link to={'/forgot_password'}className="text-[18px]  text-blue-400 font-bold">
              Forgotten Password ?
            </Link>
            <Link to={'/register'} className=" w-full">
            <Button className="h-[45px] w-full text-[18px]">Create Account<FaLongArrowAltRight /></Button>
            </Link>
            <Button className="h-[45px] text-[18px] flex gap-2"> <FaFacebook /> Login with FaceBook</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
