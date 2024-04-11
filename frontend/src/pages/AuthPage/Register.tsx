import React, { useEffect } from "react";
import { FaGithub, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../app/store";
import { registerUser } from "../../features/users/userSlice";

const Register = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setAvatar(file);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("username",username);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("file",avatar as Blob);

    store.dispatch(registerUser(formData))
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
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
          onSubmit={submitHandler}
          className="flex flex-col gap-7 justify-center items-center w-[80%] sm:w-[60%] md:w-[30%]"
        >
          <div className="flex flex-col items-center justify-center">
            {avatar ? (
              <div className=" w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-3">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ) : (
              <RxAvatar className=" size-[150px] md:size-[200px]" id="img" />
            )}
            <label
              htmlFor="file-input"
              className="items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <span>Upload a file</span>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <Input
            className="h-[50px]"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="h-[50px]"
            placeholder="Enter Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className="h-[50px]"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="h-[50px]"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col w-full gap-4">
            <Button
              disabled={loading}
              type="submit"
              className=" h-[45px] text-[18px]"
            >
              Register
            </Button>

            <Link to={"/login"} className=" w-full">
              <Button className="h-[45px] w-full text-[18px]">
                Already have an account ?
                <FaLongArrowAltRight />
              </Button>
            </Link>
            {/* <Button className="h-[45px] text-[18px] flex gap-2">
              {" "}
              <FaFacebook /> Login with FaceBook
            </Button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
