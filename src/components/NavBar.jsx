import React, { useContext, useState, useEffect,useRef} from "react";
import { NavLink } from "react-router-dom";
import { RegistrationContext } from "../context/registrationContext";
import { toast } from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import {RxCross1} from 'react-icons/rx'
const NavBar = () => {
  const { loggedIn, setLoggedIn } = useContext(RegistrationContext);
  const [menuClick, setMenuClick] = useState(false);
  let menuRef = useRef();
  useEffect(() =>{
    let handler = (e) =>{
      if(!menuRef.current.contains(e.target)){
        setMenuClick(false);
      }
    }
  document.addEventListener("mousedown",handler)})
  return (
    <div className="w-screen  flex flex-wrap md:justify-evenly justify-between items-center text-black p-5 md:px-0 lg:px-5 relative" >
      <div className="logo ">
        <p className="text-lg text-gray-300 transition-all hover:text-white ">
          <NavLink to="/"> 𝓡𝓮𝓰𝓲𝓼𝓽𝓻𝓪𝓽𝓲𝓸𝓷 App</NavLink>
        </p>
      </div>
      <div className="info md:flex  lg:gap-10 gap-5   text-gray-300 text-lg font-bold tracking-wider  hidden">
        <p className="hover:tracking-widest transition-all hover:text-white ">
          <NavLink to="/">Home</NavLink>
        </p>
        <p className="hover:tracking-widest transition-all hover:text-white ">
          <NavLink to="/About">About</NavLink>
        </p>
        <p className="hover:tracking-widest transition-all hover:text-white">
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </p>
      </div>
      <div className="buttons md:block hidden">
        <div className="flex gap-5">
          {!loggedIn && (
            <NavLink to="/Login">
              <p className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 hover:border-blue-200 border border-blue-500 rounded-md md:text-xl text-white tracking-widest font-serif">
                Login{" "}
              </p>
            </NavLink>
          )}
          {!loggedIn && (
            <NavLink to="/Register">
              {" "}
              <p className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border hover:border-blue-200 border-blue-500 rounded-md md:text-lg text-white tracking-widest font-serif">
                Register
              </p>{" "}
            </NavLink>
          )}
          {loggedIn && (
            <NavLink to="/login">
              <p
                className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border hover:border-blue-200 border-blue-500 rounded-md:md text-lg text-white tracking-widest font-serif"
                onClick={() => {
                  setLoggedIn(false);
                  toast.success("logged out successfully");
                }}
              >
                Logout{" "}
              </p>
            </NavLink>
          )}
          {loggedIn && (
            <NavLink to="/Dashboard">
              <p className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border hover:border-blue-200 border-blue-500 rounded-md md:text-lg text-white tracking-widest font-serif">
                Dashboard{" "}
              </p>
            </NavLink>
          )}
        </div>
      </div>
      
      {/* for small devices */}
      <div
        className={`text-white text-xl md:hidden transition-all duration-[5000ms] `}
        onClick={()=>setMenuClick((prev) => !prev)} ref={menuRef}
      >
        {
          menuClick === true ? (<RxCross1></RxCross1>) :(
            <AiOutlineMenu></AiOutlineMenu>)
        }

        <div className={` p-3 bg-white absolute right-[5%] top-[80%] flex flex-col items-center transition-all duration-1000 rounded-md z-50  ${menuClick === true ? ("block"):("hidden")}`}>
        <div className="info md:flex  lg:gap-10 gap-5   text-blue-950 text-lg font-bold tracking-wider  ">
        <p className="hover:tracking-widest transition-all hover:text-white ">
          <NavLink to="/">Home</NavLink>
        </p>
        <p className="hover:tracking-widest transition-all hover:text-white ">
          <NavLink to="/About">About</NavLink>
        </p>
        <p className="hover:tracking-widest transition-all hover:text-white">
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </p>
      </div>
      <div className="buttons md:hidden flex flex-col ">
        <div className="my-2">
          {!loggedIn && (
            <NavLink to="/Login">
              <p className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border border-blue-500 rounded-md md:text-lg text-white tracking-widest font-serif mb-2">
                Login{" "}
              </p>
            </NavLink>
          )}
          {!loggedIn && (
            <NavLink to="/Register">
              {" "}
              <p className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border border-blue-500 rounded-md md:text-lg text-white tracking-widest font-serif">
                Register
              </p>{" "}
            </NavLink>
          )}
          {loggedIn && (
            <NavLink to="/login">
              <p
                className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border border-blue-500 rounded-md md:text-lg text-white tracking-widest font-serif mb-2"
                onClick={() => {
                  setLoggedIn(false);
                  toast.success("logged out successfully");
                }}
              >
                Logout{" "}
              </p>
            </NavLink>
          )}
          {loggedIn && (
            <NavLink to="/Dashboard">
              <p className="px-3 py-1.5 lg:px-5 md:py-2 text-base bg-blue-600 border border-blue-500 rounded-md md:text-lg text-white tracking-widest font-serif">
                Dashboard{" "}
              </p>
            </NavLink>
          )}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
