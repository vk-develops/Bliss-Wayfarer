import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";

const Router = () => {
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
