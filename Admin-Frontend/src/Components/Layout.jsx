import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold ml-4">Travel Guide</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                onClick={() => navigate("/login")}
            >
                Login
            </button>
        </nav>
    );
};

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;
