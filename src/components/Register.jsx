import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../index.css";
const Register = () => {
  const navigate = useNavigate();
  const [psdVisible, setPsdVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  async function handleRegistration(formdata) {
    // const url = "http://localhost:4000/register";
    const url = "https://form-data-submission-2ew5.onrender.com/register";
    try {
      setloading(true);
      const toastid = toast.loading("wait...");
      const res = await fetch(url, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formdata), //used to convert the string data into json format and send in the body of the url
      });
      toast.dismiss(toastid);
      setloading(false);
      if (res.status === 200) {
        toast.success("You are registered.");
        reset();
        navigate("/login");
      } else if (res.status === 409) {
        toast.error("You are registered already.");
      }
    } catch (error) {
      toast.error("Something went Wrong.");
    }
  }

  return (
    <div className="pt-5 md:pt-0 overflow-auto no-scrollbar">
      <div className="Heading text-center sm:py-5">
        <h1 className="xl:text-2xl md:xl text-lg font-bold xl:tracking-widest">
          Create Your Account
        </h1>
        <p className="text-gray-500 tracking-tight text-sm">
          Enter the fields below to get started
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="flex flex-col justify-center gap-2 w-full pt-5 md:pt-0"
      >
        <div className={`flex flex-col space-y-1 relative mb-2`}>
          <label>
            First Name<sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            {...register("firstName", {
              required: "Name is required",
              minLength: 2,
            })}
            className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
          <p className={`text-red-400 text-xs absolute -bottom-4`}>
            {errors.firstName?.message}
          </p>
        </div>
        <div className="flex flex-col space-y-1 relative mb-2">
          <label>
            Last Name <sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            {...register("lastName", {
              required: { value: true, message: "last name is required." },
              minLength: 2,
            })}
            className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
          <p className={`text-red-400 text-xs absolute -bottom-4`}>
            {errors.lastName?.message}
          </p>
        </div>
        <div className="flex flex-col space-y-1 relative mb-2">
          <label>
            Age <sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <input
            type="number"
            name="Age"
            placeholder="Age"
            {...register("Age", {
              required: { value: true, message: "Age is required." },
            })}
            className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
          <p className={`text-red-400 text-xs absolute -bottom-4`}>
            {errors.Age?.message}
          </p>
        </div>
        <div className="flex flex-col space-y-1 relative mb-2">
          <label>
            Email<sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <input
            type="email"
            name="Email"
            placeholder="Email-id"
            {...register("Email", {
              required: { value: true, message: "Email is required." },
              minLength: 2,
            })}
            className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
          <p className={`text-red-400 text-xs absolute -bottom-4`}>
            {errors.Email?.message}
          </p>
        </div>
        <div className="flex flex-col space-y-1 relative mb-2">
          <label>
            Mobile<sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            {...register("phoneNumber", {
              required: { value: true, message: "Number is required." },
              minLength: 10,
              maxLength: 10,
            })}
            className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
          <p className={`text-red-400 text-xs absolute -bottom-4`}>
            {errors.phoneNumber?.message}
          </p>
        </div>
        <div className="flex flex-col space-y-1 relative mb-2">
          <label htmlFor="gender">
            Gender<sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <div className="flex">
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              {...register("gender", {
                required: { value: true, message: "Gender is required." },
              })}
            />
            <label className="mr-3 ml-1" htmlFor="male">
              Male{" "}
            </label>
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              {...register("gender", {
                required: { value: true, message: "Gender is required." },
              })}
            />
            <label className="ml-1" htmlFor="female">
              Female{" "}
            </label>
            <p className={`text-red-400 text-xs absolute -bottom-4`}>
              {errors.gender?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-1 relative mb-2">
          <label>
            Password <sup className="ml-1 text-red-400">*</sup> :{" "}
          </label>
          <span
            onClick={() => setPsdVisible((prev) => !prev)}
            className="absolute right-2 top-1/2 z-10"
          >
            {!psdVisible ? (
              <AiFillEyeInvisible></AiFillEyeInvisible>
            ) : (
              <AiFillEye></AiFillEye>
            )}
          </span>

          <input
            type={!psdVisible === false ? "text" : "password"}
            name="Password"
            placeholder="Password"
            {...register("Password", {
              required: { value: true, message: "Password is required." },
            })}
            className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          />
          <p className={`text-red-400 text-xs absolute -bottom-4`}>
            {errors.Password?.message}
          </p>
        </div>

        {
          // errors.option && <p>This field is required</p>
        }
        <input
          disabled={loading}
          type="submit"
          value="Register"
          className="cursor-pointer font-serif mt-3 w-full py-2 rounded-lg bg-blue-700 text-gray-100 font-bold tracking-wider text-lg mb-1 hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:bg-blue-600 hover:text-white"
        />
      </form>
      <div className="w-full pb-2">
        <p className="text-center my-2 text-gray-400 italic">
          Alreay a user?{" "}
          <NavLink to="/login">
            <span className="text-blue-500 underline">login</span>
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
};
export default Register;
