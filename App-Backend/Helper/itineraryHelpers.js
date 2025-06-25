export const validateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Allow same day itineraries by checking if dates are equal
    return start <= end;
};

export const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are the same
    if (start.toISOString().split("T")[0] === end.toISOString().split("T")[0]) {
        return 1;
    }

    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
