import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    );
};

export default App;
