import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react"; // Added useCallback import
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PostComponent from "../../Components/PostComponent";
import { useGetAllPostsQuery } from "../../Redux/Services/communityApiSlice";

const CommunityScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [lastPostId, setLastPostId] = useState(null);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [viewableItems, setViewableItems] = useState([]);

    const { data, isLoading, error } = useGetAllPostsQuery({
        limit: 3,
        lastPostId: lastPostId || null,
    });

    useEffect(() => {
        if (data?.data?.posts && data.data.posts.length > 0) {
            console.log("call");
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

    // Move useCallback outside render
    const onViewableItemsChanged = useCallback(({ viewableItems: items }) => {
        setViewableItems(items);
    }, []);

    const viewabilityConfig = useCallback(
        {
            itemVisiblePercentThreshold: 50,
        },
        []
    ); // Memoize viewabilityConfig as well

    const renderItem = useCallback(
        ({ item }) => (
            <PostComponent
                post={item}
                navigation={navigation}
                isVisible={viewableItems.some(
                    (viewableItem) => viewableItem.item._id === item._id
                )}
            />
        ),
        [navigation, viewableItems]
    ); // Add dependencies

    if (isLoading && posts.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator
                    size="large"
                    color="purple"
                />
                <Text>Loading posts...</Text>
            </View>
        );
    }

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
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SearchScreen")}
                    >
                        <FontAwesome6
                            name="bars-staggered"
                            size={22}
                            color="white"
                        />
                    </TouchableOpacity>
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
                renderItem={renderItem}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
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
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default CommunityScreen;
