import { toast } from "react-toastify";
import { useCallback } from "react";

const useToast = () => {
    const showSuccess = useCallback((msg) => {
        toast.success(msg, { position: "top-center" });
    }, []);

    const showError = useCallback((msg) => {
        toast.error(msg, { position: "top-center" });
    }, []);

    return { showSuccess, showError };
};

export default useToast;
