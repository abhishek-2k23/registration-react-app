import registerImage from "../asset/register.png";
import loginImage from "../asset/login.png";
import "../index.css";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PasswordUpdate from "./PasswordUpdate";
const Template = ({ pagetitle }) => {
  return (
    <div className="flex flex-wrap justify-center items-center h-[90vh] md:overflow-hidden overflow-auto rounded-2xl">
      <div className="parent md:h-[80vh] lg:w-7/12 md:w-10/12 w-11/12 flex md:flex-row flex-col mb-10 md:mb-0 bg-blue-800 transition-all duration-200 rounded-2xl">
        <div className="picchild md:w-7/12 bg-blue-800 rounded-t-lg">
          <img
            src={pagetitle === 'registration' ? (registerImage) : (loginImage)}
            alt="Register Your self"
            className="w-full h-full mt-10"
          />
        </div>
        <div className="formchild  md:w-5/12 h-9/12  flex flex-col items-center justify-center md:mb-0 overflow-y-auto scroll-smooth no-scrollbar bg-white">
          {pagetitle === "registration" ? (
            <Register></Register>
          ) : pagetitle === "login" ? (
            <Login></Login>
          ) : pagetitle === "ForgotPassword" ? (
            <ForgotPassword></ForgotPassword>
          ) : (
            pagetitle === "changePassword" && <PasswordUpdate></PasswordUpdate>
          )}
        </div>
      </div>
    </div>
  );
};
export default Template;
