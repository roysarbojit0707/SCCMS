import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";

const ResetPassword = () => {
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);

    axios.defaults.withCredentials = true;

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        e.target.value = value;
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, 6).split("");
        paste.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });
        const next = paste.length < 6 ? paste.length : 5;
        inputRef.current[next].focus();
    };

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendURL}/send-reset-otp?email=${email}`);
            if (response.status === 200) {
                toast.success("Password reset OTP sent successfully.");
                setIsEmailSent(true);
            } else {
                toast.error("Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = () => {
        const otp = inputRef.current.map((input) => input.value).join("");
        if (otp.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        setOtp(otp);
        setIsOtpSubmitted(true);
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendURL}/reset-password`, {
                email,
                otp,
                newPassword,
            });
            if (response.status === 200) {
                toast.success("Password reset successfully.");
                navigate("/login");
            } else {
                toast.error("Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            
            {!isEmailSent && (
                <div className="bg-white p-6  max-w-md min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
                    <h4 className="mb-2 text-xl font-semibold text-center">Reset Password</h4>
                    <p className="mb-4 text-gray-600 text-center">Enter your registered email address</p>
                    <form onSubmit={onSubmitEmail}>
                        <div className="flex items-center bg-gray-100 rounded-full mb-4 px-4 py-2">
                            <span className="text-gray-500">
                                <Mail className="w-5 h-5 text-gray-500" />
                            </span>
                            <input
                                type="email"
                                className="flex-1 bg-transparent focus:outline-none px-2"
                                placeholder="Enter email address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <button
                            className="bg-primary hover:bg-blue-800 text-white w-full py-2 rounded-md font-medium"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            {!isOtpSubmitted && isEmailSent && (
                <div className="bg-white p-6  max-w-md min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
                    <h4 className="text-center text-xl font-bold mb-2">Email Verify OTP</h4>
                    <p className="text-center text-gray-600 mb-4">
                        Enter the 6-digit code sent to your email.
                    </p>
                    <div className="flex justify-between gap-2 mb-4">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 border border-gray-300 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                ref={(el) => (inputRef.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onPaste={handlePaste}
                            />
                        ))}
                    </div>
                    <button
                        className="bg-primary hover:bg-blue-800 text-white w-full py-2 rounded-md font-medium"
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify email"}
                    </button>
                </div>
            )}

            {isOtpSubmitted && isEmailSent && (
                <div className="bg-white p-6  max-w-md min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
                    <h4 className="text-xl font-semibold mb-1 text-center">New Password</h4>
                    <p className="text-gray-600 mb-4 text-center">Enter the new password below</p>
                    <form onSubmit={onSubmitNewPassword}>
                        <div className="flex items-center bg-gray-100 rounded-full mb-4 px-4 py-2">
                            <span className="text-gray-500">
                                <Lock className="w-5 h-5 text-gray-500" />
                            </span>
                            <input
                                type="password"
                                className="flex-1 bg-transparent focus:outline-none px-2"
                                placeholder="***********"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                required
                            />
                        </div>

                        <PasswordStrengthMeter password={newPassword}/>

                        <button
                            type="submit"
                            className="bg-primary hover:bg-blue-800 text-white w-full py-2 mt-1 rounded-md font-medium"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;