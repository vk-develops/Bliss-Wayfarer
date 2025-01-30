import React from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";

const width = Dimensions.get("window").width;

const PostDetailScreen = ({ route }) => {
    const { post } = route.params;

    console.log(post);

    return (
        <ScrollView className="flex-1 bg-[#fff]">
            <View
                style={{ height: width }}
                className={`w-full bg-white shadow-lg rounded-xl`}
            ></View>

            <View className="p-4">
                <Text
                    className="text-[28px] text-headerColor-light pt-5"
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
