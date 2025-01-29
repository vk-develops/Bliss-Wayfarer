import { useDispatch } from "react-redux";
import { removeCredentials } from "../Redux/Features/usersAuthApiSlice";
import { useErrorToast, useSuccessToast } from "./useToast";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Redux/authApiSlice";

const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            const response = await logout().unwrap();
            dispatch(removeCredentials());
            useSuccessToast(response.message);
            navigate("/");
        } catch (err) {
            if (err.data && err.data.message) {
                useErrorToast(err.data.message);
            } else {
                console.log(err.message);
                useErrorToast("Server Error!");
            }
        }
    };

    return { logoutHandler };
};

export default useLogout;
