import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://your-backend-api.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                navigate("/admin");
            } else {
                setError(
                    data.message || "Invalid credentials. Please try again."
                );
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong. Please try again later.");
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
                {error && (
                    <p className="text-red-500 text-sm text-center mb-3">
                        {error}
                    </p>
                )}
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
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
