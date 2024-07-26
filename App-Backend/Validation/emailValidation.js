const isValidEmail = (email) => {
    //Using regex for validationg the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//Exports
export { isValidEmail };
