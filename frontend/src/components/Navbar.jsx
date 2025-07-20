import React, { useContext, useEffect, useRef,useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(false);

  // methods start
    const { userData, backendURL, setUserData, setIsLoggedIn } = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/logout");
            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

//     const sendVerificationOtp = async () => {
//         try {
//             axios.defaults.withCredentials = true;
//             const response = await axios.post(backendURL + "/send-otp");
//             if (response.status === 200) {
//                 navigate("/email-verify");
//                 toast.success("OTP has been sent successfully.");
//             } else {
//                 toast.error("Unable to send OTP!");
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     };

// methods end

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate(`/`)}
        className="w-9 cursor-pointer"
        src={assets.UrbanEcho_logo}
        alt=""
      />

      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/key-features">
          <li className="py-1">KEY FEATURES</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      
      <div className="flex items-center gap-4">
       
        {userData ? (                           
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="bg-primary text-white rounded-full flex justify-center items-center cursor-pointer select-none"
                        style={{
                            width: "40px",
                            height: "40px",
                        }}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                        {userData.name[0].toUpperCase()}
                    </div>

                    {dropdownOpen && (
                        
                        <div className="absolute shadow bg-gray-50 rounded p-2 top-12 right-0 z-50 w-40">

                          {/* Not need */}
                                {/* <div
                                className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded"
                                onClick={() => navigate('/user-dashboard')}
                                >
                                My Dashboard
                                </div> */}
                          {/* not need */}


                            {/* {!userData.isAccountVerified && (
                                <div
                                    className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded"
                                    onClick={sendVerificationOtp}
                                >
                                    Verify email
                                </div>
                            )}  */}


                            <div
                                className="py-1 px-2 text-red-600 cursor-pointer hover:bg-red-100 rounded"
                                onClick={handleLogout}   
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    className="flex bg-primary text-white px-8 py-3 rounded-full font-light md:block hover:scale-105 transition-all   duration-300"
                    onClick={() => navigate("/login")}
                >
                    Login 
                </button>
            )}


        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* mobile menu */}
        <div className={`${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-10" src={assets.UrbanEcho_logo} alt="" />
            <img className="w-7" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/features'><p className='px-4 py-2 rounded inline-block'>Features</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
