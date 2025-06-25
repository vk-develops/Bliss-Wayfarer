import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_APP_PROJECT_ID;

const client = createClient({
    projectId: `dk52srow`, // Replace with your project ID
    dataset: "production", // Replace with your dataset name (e.g., 'production')
    apiVersion: "2025-02-16", // Use the latest date or version of the API
    useCdn: true, // Enable CDN for faster responses
});

export default client;
