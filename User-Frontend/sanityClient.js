import { createClient } from "@sanity/client";

const projectId = process.env.EXPO_PUBLIC_SANITY_APP_PROJECT_ID;

const client = createClient({
    projectId: `${projectId}`, // Replace with your project ID
    dataset: "production", // Replace with your dataset name (e.g., 'production')
    apiVersion: "2025-02-16", // Use the latest date or version of the API
    useCdn: true, // Enable CDN for faster responses
});

export async function getPopularDestinations() {
    const posts =
        await client.fetch(`*[_type == "travelPlace" && starRating == 5]{
              _id,
  name,
  about,
  starRating,
  images,
 attractions[]->{
    _id,
    name,
    description,
    images,
    location,
    starRating
  },
  hotels[]->{
    _id,
    name,
    description,
    images,
    starRating,
    location
  },
  restaurants[]->{
    _id,
    name,
    description,
    images,
    cuisineType,
    starRating,
    location
  }
}`);
    return posts;
}

export default client;
