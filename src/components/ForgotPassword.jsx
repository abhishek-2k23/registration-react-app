import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import passwordReset from "../asset/reset-password.png";
import { toast } from "react-hot-toast";
import { RegistrationContext } from "../context/registrationContext";
import { NavLink } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [otpStatus, setOTPStatus] = useState(false);
  const [loading, setloading] = useState(false);
  const { setEmail } = useContext(RegistrationContext);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  /* OTP Generation code */
  async function handleOTP(otpData) {
    // const url = "http://localhost:4000/generateOTP";
    const url = "https://form-data-submission-2ew5.onrender.com/generateOTP";
    
    const toastid = toast.loading("Sending otp...");
    setloading(true);
    try {
      const res = await fetch(url, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(otpData),
      });

      // const result = await res.json();
      setloading(false);
      if (res.status === 201) {
        setOTPStatus(true);
        toast.success("OTP sent successfully");
        setEmail(otpData.Email);
      } else if (res.status === 404) {
        toast.error("Email not registered.");
        
      } else {
        toast.error("Some error occured. Try after some time.");
      }
    } catch (error) {
      toast.error("Some error occured. Try again");
    }
    toast.dismiss(toastid);
    setloading(false);
  }

  /* OTP validation code */
  async function validateOTP(otpData) {
    // const url = "http://localhost:4000/otpValidate";
    const url = "https://form-data-submission-2ew5.onrender.com/otpValidate";
      const toastid = toast.loading("verfiying OTP...");
      setloading(true);
    try {
      const res = await fetch(url, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(otpData),
      });

      setloading(false);
      if (res.status === 200) {
        toast.success("Validation successful.");
        setEmail(otpData.Email);
        navigate("/updatePassword");
      } else if (res.status === 404) {
        toast.error("Please enter OTP");
      } else if (res.status === 401) {
        toast.error("Incorrect OTP");
      } else {
        toast.error("Some error occured. Try after some time.");
      }
    } catch (error) {
      toast.error("Some error occured. Click on resend otp.");
    }
    toast.dismiss(toastid);
    setloading(false);
  }

  return (
    <div className="formchild bg-white flex flex-col items-center justify-center md:my-0 my-5">
      <div className="w-28">
        <img src={passwordReset} alt="login" />
      </div>
      <div className="Heading pb-4 space-y-2  px-3">
        <h1 className="text-2xl font-bold tracking-wide text-center">
          Account Recovery
        </h1>
        <p className="text-gray-800 tracking-tight text-sm md:text-center">
          To help keep your account safe, we wants to make sure that it's really
          you trying to sign in
        </p>
        <div>
          <h3 className="text-left font-bold font-mono underline">Get a verification Code</h3>
          <p className="text-justify text-sm ">
            To get a verification code, first confirm the Email Address {" "}
          </p>
        </div>
      </div>
      {otpStatus === false ? (
        <form onSubmit={handleSubmit(handleOTP)} className=" w-9/12">
          <div className="flex flex-col space-y-1">
            <label htmlFor="Email">
              Email <sup className="ml-1">*</sup> :{" "}
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Email-ID"
              id="Email"
              {...register("Email", {
                required: { value: true, message: "Email is required." },
              })}
              className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800"
            />
            <p className="text-red-500 text-xs">{errors.Email?.message}</p>
          </div>
          <input
            disabled={loading}
            type="submit"
            value={
              otpStatus === "OTP sent successfully" ? "verify OTP" : "Get OTP"
            }
            className="cursor-pointer font-serif mt-3 w-full py-2 rounded-lg bg-blue-700 text-gray-100 font-bold tracking-wider text-lg mb-1"
          />

          <p className="text-center">{otpStatus}</p>
        </form>
      ) : (
        <form onSubmit={handleSubmit(validateOTP)} className=" w-9/12">
          <div className="flex flex-col space-y-1">
            <label htmlFor="Email">
              Email <sup className="ml-1 text-red-500">*</sup> :{" "}
            </label>
            <input
              disabled={true}
              type="email"
              name="Email"
              id="Email"
              {...register("Email", {
                required: { value: true, message: "Email is required." },
              })}
              className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            />
            <p className="text-red-500 text-xs">{errors.Email?.message}</p>
          </div>
          <div className="flex flex-col space-y-1 transition-all  mb-2">
            <label htmlFor="OTP">
              Enter Your OTP <sup className="ml-1">*</sup> :{" "}
            </label>
            <input
              type="number"
              name="OTP"
              placeholder="OTP"
              id="OTP"
              {...register("OTP", { required: true, minLength: 6 })}
              className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            />
            {/* <p className="text-blue-600 underline italic absolute right-0 -bottom-5 text-sm">Resend OTP</p> */}
          </div>
          <input
            type="submit"
            value="verify OTP"
            className="cursor-pointer font-serif mt-3 w-full py-2 rounded-lg bg-blue-700 text-gray-100 font-bold tracking-wider text-lg mb-1 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
        </form>
      )}
      
      <div className="w-full">
          <p className="text-center mb-5 text-gray-400 italic">
            You remembered?{" "}
            <NavLink to="/login">
              <span className="text-blue-500 underline hover:text-blue-700 transition-all duration-50">
                Login
              </span>
            </NavLink>{" "}
          </p>
        </div>
    </div>
  );
};
export default Login;
