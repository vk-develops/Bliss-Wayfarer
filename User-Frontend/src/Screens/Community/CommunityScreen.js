import { View, Text, ScrollView } from "react-native";
import React from "react";
import PostComponent from "../../Components/PostComponent";

const CommunityScreen = () => {
    return (
        <ScrollView className="flex-1 bg-[#fafafa]">
            <View className="p-4">
                <View className="pb-6">
                    <Text
                        className="text-2xl"
                        style={{ fontFamily: "jakartaSemiBold" }}
                    >
                        Trending Posts
                    </Text>
                </View>
                <View>
                    <PostComponent />
                    <PostComponent />
                </View>
            </View>
        </ScrollView>
    );
};

export default CommunityScreen;
