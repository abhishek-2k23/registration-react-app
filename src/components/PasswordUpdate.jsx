import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import passwordReset from "../asset/reset-password.png";
import { toast } from "react-hot-toast";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { RegistrationContext } from "../context/registrationContext";
const PasswordUpdate = () => {
  const [psdVisible, setPsdVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CNFpsdVisible, setCNFPsdVisible] = useState(false);
  const {emailforPSD} = useContext(RegistrationContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function updatePassword(passwordData) {
    // const url = "http://localhost:4000/resetPassword"
    const url = "https://form-data-submission-2ew5.onrender.com/resetPassword";
    const toastid = toast.loading("Updating...");
    try {
      passwordData.Email = emailforPSD;
      setLoading(true);
      const res = await fetch(url, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      // const result = await res.json();
      toast.dismiss(toastid);
      setLoading(false);
      if (res.status === 201) {
        toast.success("Password updated");
        navigate("/login");
      } else if (res.status === 402) {
        toast.error("Password not matched");
      } else {
        toast.error("Some error occured. Try again");
      }
    } catch (error) {
      toast.error("Some error occured. Try again");
    }
    toast.dismiss(toastid);
  }
  return (
    
        <div className="formchild  my-5 w-full bg-white flex flex-col items-center justify-center rounded-tr-2xl rounded-br-2xl">
          <div className="w-32 mb-3">
            <img src={passwordReset} alt="reset password" />
          </div>
          <div className="Heading text-center pb-4 ">
            <h1 className="text-xl font-bold tracking-widest">
              Update Your Password
            </h1>
          </div>
          <form onSubmit={handleSubmit(updatePassword)} className=" w-9/12">
            <div className="flex flex-col space-y-1 relative">
              <label htmlFor="Email">
                New Password <sup className="ml-1 text-red-500">*</sup> :{" "}
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
                type={`${psdVisible === true ? "text" : "password"}`}
                name="Password"
                id="Password"
                placeholder="New Password"
                {...register("Password")}
                className="border border-gray-400 rounded-md px-2 py-1.5 font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              />
            </div>
            <div className="flex flex-col space-y-1 relative mb-5">
              <label htmlFor="Password">
                Confirm Password <sup className="ml-1 text-red-500">*</sup> :{" "}
              </label>
              <span
                onClick={() => setCNFPsdVisible((prev) => !prev)}
                className="absolute right-2 top-1/2 z-10"
              >
                {!CNFpsdVisible ? (
                  <AiFillEyeInvisible></AiFillEyeInvisible>
                ) : (
                  <AiFillEye></AiFillEye>
                )}
              </span>
              <input
                type={`${CNFpsdVisible === true ? "text" : "password"}`}
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="border border-gray-400 rounded-md px-2 py-1.5 relative font-mono text-blue-800 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              />
            </div>
            <input
            disabled={loading}
              type="submit"
              value="Change Password"
              className="cursor-pointer font-serif xl:mt-3  w-full py-2 rounded-lg bg-blue-700 text-gray-100 font-bold lg:tracking-wider md:text-base xl:text-lg mb-1"
            />
          </form>
        </div>
  );
};
export default PasswordUpdate;
