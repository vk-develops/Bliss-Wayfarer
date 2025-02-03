export const calculateRelevanceScore = (post) => {
    const categoryScore =
        post.category === "Gem" ? 15 : post.category === "Itinerary" ? 10 : 5;
    const engagementScore =
        (post.likes?.length || 0) * 2 + (post.comments?.length || 0) * 3;
    const recencyScore = Math.max(
        0,
        100 - (Date.now() - post.createdAt) / (1000 * 60 * 60 * 24)
    );

    return categoryScore + engagementScore + recencyScore;
};
