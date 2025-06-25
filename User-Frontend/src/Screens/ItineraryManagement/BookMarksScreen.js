import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Alert,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    useGetBookmarkedPlacesQuery,
    useGetBookmarkedPostsQuery,
} from "../../Redux/Services/userAccountApiSlice";
import { getSanityImageUrl } from "../../Helper/sanityImg";

const BookmarksScreen = ({ route, navigation }) => {
    const [places, setPlaces] = useState([]);
    const [posts, setPosts] = useState([]);

    const { itineraryId, dayNumber } = route.params;

    // Queries to get bookmarked places and posts
    const { data: bookmarkedPlaces, isLoading: loadingPlaces } =
        useGetBookmarkedPlacesQuery();
    const { data: bookmarkedPosts, isLoading: loadingPosts } =
        useGetBookmarkedPostsQuery();

    useEffect(() => {
        if (bookmarkedPlaces) {
            setPlaces(bookmarkedPlaces.places);
        }

        if (bookmarkedPosts) {
            setPosts(bookmarkedPosts.posts);
        }
    }, [bookmarkedPlaces, bookmarkedPosts]);

    const handleSelectReference = (item, type) => {
        // Create the reference object with the correct ID format
        // For places (from Sanity), use the _id directly
        // For posts (from MongoDB), use the _id
        const reference = {
            referenceId: item._id,
            referenceType: type, // 'place' or 'post'
            type: type === "place" ? "sanity" : "post",
            // Include the raw item for debugging if needed
            rawItem: JSON.stringify(item),
        };

        console.log(`Selected ${type} reference:`, reference);

        // Navigate back to the CreateActivityScreen with the selected reference
        navigation.navigate("CreateActivityScreen", {
            selectedReference: reference,
            itineraryId: itineraryId,
            dayNumber: dayNumber,
        });
    };

    const RenderPosts = ({ item }) => {
        return (
            <View className="w-[220px] my-4 pr-4">
                {/* Ensure that the image source is a valid URL */}
                {item.media && item.media[0]?.url ? (
                    <Image
                        className="w-full h-[150px] rounded-lg"
                        source={{ uri: item.media[0].url }}
                        resizeMode="cover"
                    />
                ) : (
                    <Text>No Image Available</Text>
                )}
                <Text numberOfLines={1}>{item.title}</Text>
                <Text className="text-gray-500 text-xs">ID: {item._id}</Text>

                <View className="flex items-start justify-start">
                    <TouchableOpacity
                        className="bg-purple-800 mt-2 p-2 rounded-lg"
                        onPress={() => handleSelectReference(item, "post")}
                    >
                        <Text className="text-white">Add Reference</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const RenderPlaces = ({ item }) => {
        const imgUrl = getSanityImageUrl(item.images[0]);

        return (
            <View className="w-[220px] my-4 pr-4">
                {/* Ensure that the image source is a valid URL */}
                {imgUrl ? (
                    <Image
                        className="w-full h-[150px] rounded-lg"
                        source={{ uri: imgUrl }}
                        resizeMode="cover"
                    />
                ) : (
                    <Text>No Image Available</Text>
                )}
                <Text numberOfLines={1}>{item.name}</Text>
                <Text className="text-gray-500 text-xs">ID: {item._id}</Text>

                <View className="flex items-start justify-start">
                    <TouchableOpacity
                        className="bg-purple-800 mt-2 p-2 rounded-lg"
                        onPress={() => handleSelectReference(item, "place")}
                    >
                        <Text className="text-white">Add Reference</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-100 p-4">
            {/* Header with Back Button */}
            <View className="flex-row items-center mb-4">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2 mr-2"
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Select a Reference</Text>
            </View>

            {/* Bookmarked Places */}
            <Text className="text-xl mt-4">Bookmarked Places</Text>
            {loadingPlaces ? (
                <Text>Loading places...</Text>
            ) : places?.length === 0 ? (
                <Text className="text-gray-500 mt-2">No bookmarked places</Text>
            ) : (
                <FlatList
                    data={places || []}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) =>
                        item._id?.toString() || Math.random().toString()
                    }
                    renderItem={({ item }) => <RenderPlaces item={item} />}
                />
            )}

            {/* Bookmarked Posts */}
            <Text className="text-xl mt-4">Bookmarked Posts</Text>
            {loadingPosts ? (
                <Text>Loading posts...</Text>
            ) : posts?.length === 0 ? (
                <Text className="text-gray-500 mt-2">No bookmarked posts</Text>
            ) : (
                <FlatList
                    data={posts || []}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) =>
                        item._id?.toString() || Math.random().toString()
                    }
                    renderItem={({ item }) => <RenderPosts item={item} />}
                />
            )}
        </View>
    );
};

export default BookmarksScreen;
