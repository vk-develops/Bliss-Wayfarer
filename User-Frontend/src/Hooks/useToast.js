import Toast from "react-native-toast-message";

const useSuccessToast = ({ msg }) => {
    Toast.show({
        type: "success",
        text1: msg,
    });
};

const useErrorToast = ({ msg }) => {
    Toast.show({
        type: "error",
        text1: msg,
    });
};

export { useSuccessToast, useErrorToast };
