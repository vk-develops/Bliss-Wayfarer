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
        await client.fetch(`*[_type == "travelPlace" && starRating > 4.2]{
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

export async function getPlaceDetail(id) {
    const data = await client.fetch(`*[_id == "${id}"]`);
    return data;
}

export async function getFilteredAttractions(category) {
    const data =
        await client.fetch(`*[_type == "attraction" && category == "${category}"]
`);

    return data;
}

export async function searchAllPlaces(searchQuery) {
    const data =
        await client.fetch(`*[_type in ["attraction", "hotel", "restaurant"] && lower(name) match "*${searchQuery}*"]{
      name,
      place,
      location,
      _id,
      images,  
      _type
  }`);

    return data;
}

export default client;
