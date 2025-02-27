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
                <Text>{item.title}</Text>

                <View className="flex items-start justify-start">
                    <TouchableOpacity className="bg-purple--800 mt-2 p-2 rounded-lg">
                        <Text className="text-white">Add Reference</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const RenderPlaces = ({ item }) => {
        const imgUrl = getSanityImageUrl(item.images[0]);

        console.log(imgUrl);

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
                <Text>{item.name}</Text>

                <View className="flex items-start justify-start">
                    <TouchableOpacity className="bg-purple--800 mt-2 p-2 rounded-lg">
                        <Text className="text-white">Add Reference</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // console.log(places[0].images[0]);

    return (
        <View className="flex-1 bg-gray-100 p-4">
            {/* Bookmarked Places */}
            <Text className="text-xl mt-4">Bookmarked Places</Text>
            {loadingPlaces ? (
                <Text>Loading places...</Text>
            ) : (
                <FlatList
                    data={places}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <RenderPlaces item={item} />}
                />
            )}

            {/* Bookmarked Posts */}
            <Text className="text-xl mt-4">Bookmarked Posts</Text>
            {loadingPosts ? (
                <Text>Loading posts...</Text>
            ) : (
                <FlatList
                    data={posts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <RenderPosts item={item} />}
                />
            )}
        </View>
    );
};

export default BookmarksScreen;
