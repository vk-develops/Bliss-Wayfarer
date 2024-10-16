import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const width = Dimensions.get("window").width;
const postWidth = width - 32;

const PostComponent = () => {
    return (
        <View className="border-b-[0.2px] py-6 border-slate-200">
            <View>
                <TouchableOpacity className="flex items-center justify-start flex-row">
                    <View className="w-12 h-12 rounded-full bg-slate-400"></View>
                    <View className="flex items-start justify-center flex-col pl-3">
                        <Text
                            className="text-lg text-headerColor-light"
                            style={{ fontFamily: "jakartaSemiBold" }}
                        >
                            Mightier
                        </Text>
                        <Text
                            className="text-xs text-paraColor-light pt-[1px]"
                            style={{ fontFamily: "jakartaMedium" }}
                        >
                            Chennai
                        </Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text
                        className="text-base text-paraColor-light py-2"
                        style={{ fontFamily: "jakartaMedium" }}
                    >
                        Android Bundled 260ms
                        D:\Portfolio-Projects\FullStack\Bliss-Wayfarer\User-Frontend\node_modules\expo\AppEntry.js
                        (1 module)
                    </Text>
                </View>

                <View
                    className={`w-full h-80 bg-white shadow-lg rounded-xl mt-4`}
                ></View>
            </View>
        </View>
    );
};

export default PostComponent;
