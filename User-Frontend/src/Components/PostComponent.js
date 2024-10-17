import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const width = Dimensions.get("window").width;
const postWidth = width - 32;

const PostComponent = () => {
    return (
        <View className="border-b-[0.2px] py-6 border-slate-200">
            <View>
                <TouchableOpacity className="flex items-center justify-start flex-row">
                    <View className="w-12 h-12 rounded-full bg-purple--800"></View>
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
                        className="text-[15px] text-paraColor-light py-2"
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

                    <TouchableOpacity>
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
