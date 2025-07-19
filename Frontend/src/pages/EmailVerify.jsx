import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {
    const inputRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);
    const navigate = useNavigate();

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

    const handleVerify = async () => {
        const otp = inputRef.current.map((input) => input.value).join("");
        if (otp.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(backendURL + "/verify-otp", { otp });
            if (response.status === 200) {
                toast.success("OTP verified successfully!");
                getUserData();
                navigate("/user-dashboard");
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            toast.error("Failed to verify OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/user-dashboard");
    }, [isLoggedIn, userData]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center">

            <div className="bg-white p-6  max-w-md min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
                <h4 className="text-center font-bold text-xl mb-2">Email Verify OTP</h4>
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
                    className="bg-primary hover:bg-blue-800 text-white font-semibold w-full py-2 rounded-md transition duration-200"
                    disabled={loading}
                    onClick={handleVerify}
                >
                    {loading ? "Verifying..." : "Verify email"}
                </button>
            </div>
        </div>
    );
};

export default EmailVerify;