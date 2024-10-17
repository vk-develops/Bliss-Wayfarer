import React from "react";
import { ScrollView, View, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const PostDetailScreen = () => {
    return (
        <ScrollView className="flex-1 bg-[#fafafa]">
            <View className={`h-[${width}px] w-[${width}px] bg-white`}></View>
        </ScrollView>
    );
};

export default PostDetailScreen;
