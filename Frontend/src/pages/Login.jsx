import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx"

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            if (isCreateAccount) {
                const response = await axios.post(`${backendURL}/register`, { name, email, password });
                if (response.status === 201) {
                    navigate("/");
                    toast.success("Account created successfully. Please login");
                } else {
                    toast.error("Email already exists");
                }
            } else {
                const response = await axios.post(`${backendURL}/login`, { email, password });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/user-dashboard");
                } else {
                    toast.error("Email/Password incorrect");
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        
           <div className='min-h-[80vh] flex items-center justify-center'> 

            <div className="bg-white p-6  max-w-md min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
                <h2 className="text-center text-2xl font-semibold mb-4">
                    {isCreateAccount ? "Create Account" : "Login"}
                </h2>
                <form onSubmit={onSubmitHandler} className="space-y-2">
                    {isCreateAccount && (
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 ">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter fullname"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Id
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="************"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    {!isCreateAccount && (
                    <div className="flex justify-between text-sm">
                        <Link to="/reset-password" className="text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    )}

                    {isCreateAccount && (
                      <PasswordStrengthMeter password={password}/>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-blue-800 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="text-center mt-4 text-sm">
                    <p className="mb-0">
                        {isCreateAccount ? (
                            <>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setIsCreateAccount(false)}
                                    className="text-primary underline cursor-pointer"
                                >
                                    Login here
                                </span>
                            </>
                        ) : (
                            <>
                                Don&apos;t have an account?{" "}
                                <span
                                    onClick={() => setIsCreateAccount(true)}
                                    className="text-primary underline cursor-pointer"
                                >
                                    Sign up
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>

            </div>
        
    );
};

export default Login;