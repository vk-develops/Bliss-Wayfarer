export const getSanityImageUrl = (imageRef) => {
    if (!imageRef) return null;
    const ref = imageRef.asset._ref;
    const parts = ref.split("-");
    const imageId = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    return `https://cdn.sanity.io/images/dk52srow/production/${imageId}-${dimensions}.${format}`;
};
