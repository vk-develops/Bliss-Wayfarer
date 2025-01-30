import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PostComponent from "../../Components/PostComponent";
import { useGetAllPostsQuery } from "../../Redux/Services/communityApiSlice";

const CommunityScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [lastPostId, setLastPostId] = useState(null);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const { data, isLoading, error } = useGetAllPostsQuery({
        limit: 10,
        lastPostId: lastPostId || null,
    });

    useEffect(() => {
        if (data?.data?.posts && data.data.posts.length > 0) {
            console.log("Call made");
            setPosts((prevPosts) => [...prevPosts, ...data.data.posts]);
            setLastPostId(
                data.data.posts[data.data.posts.length - 1]?._id || null
            );
        }
    }, [data]);

    const loadMorePosts = () => {
        if (data?.data?.hasMore && !isFetchingMore) {
            setIsFetchingMore(true);
            setTimeout(() => {
                setIsFetchingMore(false);
            }, 1000);
        }
    };

    return (
        <View className="flex-1 bg-[#fff]">
            <View className="p-4 bg-purple--800 shadow-xl flex items-center justify-between flex-row">
                <Text
                    className="text-xl text-white pb-1"
                    style={{ fontFamily: "jakartaSemiBold" }}
                >
                    WayfarerHub
                </Text>
                <View className="flex items-center justify-end flex-row gap-5">
                    <TouchableOpacity>
                        <FontAwesome6
                            name="bars-staggered"
                            size={22}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                className="p-4"
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <PostComponent
                        post={item}
                        navigation={navigation}
                    />
                )}
                ListEmptyComponent={() =>
                    isLoading ? (
                        <Text>Loading posts...</Text>
                    ) : (
                        <Text>No posts found.</Text>
                    )
                }
                ListFooterComponent={() =>
                    isFetchingMore ? (
                        <ActivityIndicator
                            size="large"
                            color="purple"
                        />
                    ) : null
                }
                onEndReached={loadMorePosts} // Fetch more when reaching the bottom
                onEndReachedThreshold={0.5} // Fetch when 50% of the list is visible
            />
        </View>
    );
};

export default CommunityScreen;
