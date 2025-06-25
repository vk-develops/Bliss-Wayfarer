import React, { useState, useRef, useCallback, useEffect } from "react";
import {
    ScrollView,
    View,
    Dimensions,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const width = Dimensions.get("window").width;

const DisplayMedia = ({ item, isVisible }) => {
    const videoRef = useRef(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        const shouldPlay = isVisible && isFocused;

        if (shouldPlay && item.mediaType === "Video") {
            videoRef.current?.playAsync();
        } else if (item.mediaType === "Video") {
            videoRef.current?.pauseAsync();
        }
    }, [isVisible, isFocused]);

    if (item.mediaType === "Video") {
        return (
            <View style={{ width, height: width }}>
                <Video
                    source={{ uri: item.url }}
                    style={{ width, height: width }}
                    ref={videoRef}
                    resizeMode="contain"
                    shouldPlay={false}
                    isLooping={true}
                    useNativeControls
                />
            </View>
        );
    }

    return (
        <View style={{ width, height: width }}>
            <Image
                source={{ uri: item.url }}
                style={{ width, height: width, resizeMode: "contain" }}
            />
        </View>
    );
};

const PostDetailScreen = ({ route }) => {
    const { post } = route.params;
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const handleMediaViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentMediaIndex(viewableItems[0]?.index || 0);
        }
    }, []);

    const renderMediaItem = useCallback(
        ({ item, index }) => (
            <DisplayMedia
                item={item}
                isVisible={index === currentMediaIndex}
            />
        ),
        [currentMediaIndex]
    );

    return (
        <ScrollView className="flex-1 bg-[#fff]">
            <FlatList
                data={post.media || []}
                renderItem={renderMediaItem}
                keyExtractor={(item) => item._id || item.url}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={handleMediaViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
            />

            <View className="p-4">
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity className="flex-row items-center">
                        <View className="w-12 h-12 rounded-full bg-purple--800 mr-3"></View>
                        <View>
                            <Text
                                className="text-lg text-headerColor-light"
                                style={{ fontFamily: "jakartaSemiBold" }}
                            >
                                {post.user.name}
                            </Text>
                            <Text
                                className="text-xs text-paraColor-light"
                                style={{ fontFamily: "jakartaMedium" }}
                            >
                                {post.location}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text
                    className="text-[28px] text-headerColor-light pt-2"
                    style={{ fontFamily: "jakartaSemiBold" }}
                >
                    {post.title}
                </Text>

                <Text
                    className="text-paraColor-light text-[15px] pt-3"
                    style={{
                        fontFamily: "jakartaMedium",
                        lineHeight: 23.5,
                    }}
                >
                    {post.caption}
                </Text>
            </View>
        </ScrollView>
    );
};

export default PostDetailScreen;
