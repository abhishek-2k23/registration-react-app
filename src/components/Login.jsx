import { RegistrationContext } from "../context/registrationContext";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import man from "../asset/man.png";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai";

const Login = () => {
  const [loading,setloading] = useState(false);
  const [psdVisible,setPsdVisible] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit,formState} = useForm();
  const {errors} = formState;
  const { setLoggedIn, setUser } = useContext(RegistrationContext);

  async function handleLogin(loginData) {
    const url = "https://form-data-submission-2ew5.onrender.com/login";
    // const url = "http://localhost:4000/login";
    const toastid = toast.loading('Logging in...');
    try {
      setloading(true);
      // const toastid = toast.loading('Logging in...');
      
      const res = await fetch(url, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const result = await res.json();
      setloading(false);
      toast.dismiss(toastid);
      if (res.status === 200) {
        setLoggedIn(true);
        toast.success("logged in");
        setUser(result.user.firstName);
        navigate("/Dashboard");
      } else if (res.status === 404) {
        toast.error("User not found");
        setLoggedIn(false);
      } else {
        toast.error("Password not matched");
        setLoggedIn(false);
        toast.dismiss(toastid);
      }
    } catch (error) {
      toast.error("Some error Occured. Try after some time.");
    }
    toast.dismiss(toastid);
  }
  return (
      <div className="flex flex-col justify-center items-center w-full my-5 md:my-0">
          <div className="w-32">
            <img src={man} alt="login" />
          </div>
          <div className="Heading text-center pb-4 ">
            <h1 className="text-2xl font-bold tracking-widest">Welcome Back</h1>
            <p className="text-gray-500 tracking-tight text-sm">
              Fill Your Details
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className=" w-9/12">
            <div className="flex flex-col space-y-1">
              <label htmlFor="Email" >
                Email <sup className="ml-1">*</sup> :{" "}
              </label>
              <input
                type="email"
                name="Email"
                placeholder="Email-ID"
                id="Email"
                {...register("Email", { required: {value:true,message : "Email is required"} })}
                className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              />
              <p className="text-red-500 text-xs">{errors.Email?.message}</p>
            </div>
            <div className="flex flex-col space-y-1 relative mb-5">
              <label htmlFor="Password">
                Password <sup className="ml-1">*</sup> :{" "}
              </label>
              
                <span onClick={()=>setPsdVisible((prev) => !prev)} className="absolute right-2 top-1/2 z-10">{!psdVisible ? (<AiFillEyeInvisible ></AiFillEyeInvisible>) : (<AiFillEye></AiFillEye>)}</span>
                
              
              <input
                type={psdVisible === false ? ("password") : ("text")}
                name="Password"
                placeholder="Password"
                id="Password"
                {...register("Password", { required: {value:true,message : "Password is required"} })}
                className="border border-gray-400 rounded-md px-2 py-1.5 relative font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              />
              <NavLink to="/PasswordReset"><p className="text-blue-600 underline italic absolute right-0 -bottom-4 text-sm">Forgot Password</p></NavLink>
              <p className="text-red-500 text-xs absolute -bottom-4">{errors.Password?.message}</p>
            </div>
            <input
              disabled={loading}
              type="submit"
              value="Login"
              className="cursor-pointer font-serif mt-3 w-full py-2 rounded-lg bg-blue-700 text-gray-100 font-bold tracking-wider text-lg mb-1 hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:bg-blue-600 hover:text-white"
            />


            <div className="w-full">
              <p className="text-center my-2 text-gray-400 italic">
                Create an Account?{" "}
                <NavLink to="/register">
                  <span className="text-blue-500 underline">Register</span>
                </NavLink>{" "}
              </p>
            </div>
          </form>
      </div>
  );
};
export default Login;
