import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    FlatList,
} from "react-native";
import { Video } from "expo-av";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBookmarkPostMutation } from "../Redux/Services/userAccountApiSlice";

const width = Dimensions.get("window").width;
const postWidth = width - 32;

const DisplayImages = ({ item }) => {
    return (
        <View>
            <Image
                style={{
                    height: "100%",
                    width: width - 32,
                    resizeMode: "cover",
                }}
                source={{ uri: item.url }}
                onError={() => console.log("Image failed to load")}
            />
        </View>
    );
};

const DisplayVideo = ({ item, isVisible }) => {
    const videoRef = useRef(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        const shouldPlay = isVisible && isFocused;

        if (shouldPlay) {
            videoRef.current?.playAsync();
        } else {
            videoRef.current?.pauseAsync();
        }
    }, [isVisible, isFocused]);

    // Pause video when component unmounts
    useEffect(() => {
        return () => {
            videoRef.current?.pauseAsync();
        };
    }, []);

    return (
        <View>
            <Video
                source={{ uri: item.url }}
                style={{
                    height: "100%",
                    width: width - 32,
                }}
                ref={videoRef}
                rate={1.0}
                volume={1.0}
                resizeMode="contain"
                shouldPlay={false}
                isLooping={true}
                useNativeControls
            />
        </View>
    );
};

const PostComponent = ({ navigation, post, isVisible }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const flatListRef = useRef(null);

    const [bookmarkPost] = useBookmarkPostMutation();

    const handleMediaViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentMediaIndex(viewableItems[0]?.index || 0);
        }
    };

    const mediaViewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const renderMediaItem = ({ item, index }) => {
        if (item.mediaType === "Video") {
            return (
                <DisplayVideo
                    item={item}
                    isVisible={isVisible && index === currentMediaIndex}
                />
            );
        } else {
            return <DisplayImages item={item} />;
        }
    };

    const handleBookmark = async (postId) => {
        try {
            console.log("Bookmarking post:", postId);
            const res = await bookmarkPost({ postId }).unwrap();
            console.log("Bookmark response:", res);
        } catch (error) {
            console.error("Error bookmarking place:", error);
        }
    };

    return (
        <View className="border-b-[0.2px] py-6 border-slate-200">
            <View>
                <View className="flex items-center justify-between flex-row">
                    <TouchableOpacity className="flex items-center justify-start flex-row">
                        <View className="w-12 h-12 rounded-full bg-purple--800"></View>
                        <View className="flex items-start justify-center flex-col pl-3">
                            <Text
                                className="text-lg text-headerColor-light"
                                style={{ fontFamily: "jakartaSemiBold" }}
                            >
                                {post.user.name}
                            </Text>
                            <Text
                                className="text-xs text-paraColor-light pt-[2px]"
                                style={{ fontFamily: "jakartaMedium" }}
                            >
                                {post.location}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBookmark(post._id)}>
                        <Ionicons
                            name="bookmark-outline"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text
                        className="text-headerColor-light text-base pt-3"
                        style={{ fontFamily: "jakartaSemiBold" }}
                    >
                        {post.title}
                    </Text>
                    <Text
                        className="text-[14px] text-paraColor-light py-2"
                        style={{ fontFamily: "jakartaRegular", lineHeight: 20 }}
                    >
                        {post.caption}
                    </Text>
                </View>

                {post.media.length > 0 && (
                    <View
                        className="rounded-3xl overflow-hidden mt-3"
                        style={{ height: width - 16 }}
                    >
                        <FlatList
                            ref={flatListRef}
                            data={post.media || []}
                            keyExtractor={(item) => item._id || item.url}
                            renderItem={renderMediaItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            onViewableItemsChanged={
                                handleMediaViewableItemsChanged
                            }
                            viewabilityConfig={mediaViewabilityConfig}
                        />
                    </View>
                )}

                {post.relevanceScore !== undefined && (
                    <View className="flex items-start justify-start flex-row gap-1 my-2">
                        <Text
                            style={{ fontFamily: "jakartaSemiBold" }}
                            className="text-paraColor-light text-lg"
                        >
                            Relevance Score:{" "}
                        </Text>
                        <Text
                            style={{ fontFamily: "jakartaSemiBold" }}
                            className="text-purple--800 text-lg"
                        >
                            {Number(post.relevanceScore).toFixed(3)}
                        </Text>
                    </View>
                )}

                <View className="mt-4 flex items-center justify-between flex-row">
                    <View className="flex items-center justify-start flex-row gap-5">
                        <TouchableOpacity>
                            <FontAwesome6
                                name="bars-staggered"
                                size={22}
                                color="#1e1e1e"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome6
                                name="bars-staggered"
                                size={22}
                                color="#1e1e1e"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome6
                                name="bars-staggered"
                                size={22}
                                color="#1e1e1e"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("PostDetailScreen", { post });
                        }}
                    >
                        <Text
                            className="text-base py-2 px-4 bg-purple--800 text-white rounded-lg"
                            style={{ fontFamily: "jakartaMedium" }}
                        >
                            View Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PostComponent;
