import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../Redux/authApiSlice";
import { setCredentials } from "../Redux/Features/usersAuthApiSlice";
import useToast from "../Hooks/useToast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { showSuccess, showError } = useToast();

    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ email, password }).unwrap();
            console.log(response);
            const userInfo = response.userInfo;
            dispatch(setCredentials(userInfo));
            showSuccess(response.data.message);
            //Redirect after successfull login
            navigate("/admin");
        } catch (err) {
            console.log(err.data.message);
            showError(err.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
                onSubmit={handleLogin}
            >
                <h2 className="text-center text-2xl font-bold mb-4">
                    Admin Login
                </h2>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-800 transition disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
