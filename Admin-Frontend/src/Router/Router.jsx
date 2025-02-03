import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../Components/Layout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/Features/usersAuthApiSlice";

const Router = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const checkIsLoggedIn = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_URI}${
                    import.meta.env.VITE_BACKEND_USERS_AUTH_URI
                }/isloggedin`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (response.ok) {
                const data = await response.json();
                const userInfo = data.userInfo;

                dispatch(setCredentials(userInfo));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        checkIsLoggedIn();
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}
            >
                <Route
                    index
                    element={<HomePage />}
                />
            </Route>
            <Route
                path="/login"
                element={<LoginPage />}
            />
            <Route
                path="/admin"
                element={<AdminPage />}
            />
        </Routes>
    );
};

export default Router;
