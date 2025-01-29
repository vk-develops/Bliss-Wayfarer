import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import HomePage from "../Pages/HomePage";

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
        </Routes>
    );
};

export default Router;
