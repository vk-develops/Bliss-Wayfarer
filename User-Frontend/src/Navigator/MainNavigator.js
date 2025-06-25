import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DrawerNavigator from "./DrawerNavigator";
import OnboardingStack from "../Screens/Onboarding/OnboardingStack";
import { AUTH_URL, BASE_URL } from "../Redux/constants";
import { setCredentials } from "../Redux/Features/usersAuthSlice";
import AuthenticateLoader from "../Components/AuthenticateLoader";

const MainNavigator = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const checkIsLoggedIn = async () => {
        try {
            const response = await fetch(`${BASE_URL}${AUTH_URL}/isloggedin`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                const userInfo = data.userInfo;
                dispatch(setCredentials(userInfo));
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIsLoggedIn();
    }, [isAuthenticated]);

    if (isLoading) {
        return <AuthenticateLoader title={"Checking Credentials..."} />;
    }

    return isAuthenticated ? <DrawerNavigator /> : <OnboardingStack />;
};

export default MainNavigator;
