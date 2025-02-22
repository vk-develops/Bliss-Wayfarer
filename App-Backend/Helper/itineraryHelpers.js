export const validateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end;
};

export const calculateDays = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
