export const checkImageForSpam = async (mediaUrl) => {
    try {
        const apiUrl = `https://api.sightengine.com/1.0/check.json?api_user=${
            process.env.SIGHTENGINE_API_USER
        }&api_secret=${
            process.env.SIGHTENGINE_API_SECRET
        }&models=nudity,offensive,scam&url=${encodeURIComponent(mediaUrl)}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        console.log("result-img", result);

        if (result.nudity?.raw > 0.7 || result.nudity?.safe < 0.3)
            return { flagged: true, reason: "Nudity detected" };
        if (result.offensive?.prob > 0.7)
            return { flagged: true, reason: "Offensive content detected" };
        if (result.scam?.prob > 0.7)
            return { flagged: true, reason: "Potential scam detected" };

        return { flagged: false, reason: "" };
    } catch (error) {
        console.error("Error checking image:", error);
        return { flagged: false, reason: "AI moderation error" };
    }
};

export const checkTextForSpam = async (text) => {
    try {
        const apiUrl = `https://api.sightengine.com/1.0/text/check.json?api_user=${
            process.env.SIGHTENGINE_API_USER
        }&api_secret=${
            process.env.SIGHTENGINE_API_SECRET
        }&categories=spam,profanity&mode=standard&lang=en,es,fr&text=${encodeURIComponent(
            text
        )}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        console.log("Text Moderation Response:", result);

        if (result.status !== "success" || result.error) {
            console.error("Sightengine Error:", result);
            return {
                flagged: false,
                reason: `AI moderation error: ${
                    result.error?.message || "Unknown error"
                }`,
            };
        }

        if (result.profanity?.matches?.length > 0)
            return { flagged: true, reason: "Profanity detected" };
        if (result.spam?.matches?.length > 0)
            return { flagged: true, reason: "Spam detected" };

        return { flagged: false, reason: "" };
    } catch (error) {
        console.error("Error checking text:", error);
        return { flagged: false, reason: "AI moderation error" };
    }
};
