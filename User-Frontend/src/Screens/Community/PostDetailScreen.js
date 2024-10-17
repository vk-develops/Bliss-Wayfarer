import React from "react";
import { ScrollView, View, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const PostDetailScreen = () => {
    return (
        <ScrollView className="flex-1 bg-[#fafafa]">
            <View
                style={{ height: width }}
                className={`w-full bg-white shadow-lg rounded-xl`}
            ></View>
        </ScrollView>
    );
};

export default PostDetailScreen;
