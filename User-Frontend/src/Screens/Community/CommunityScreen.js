import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PostComponent from "../../Components/PostComponent";

const CommunityScreen = ({ navigation }) => {
    return (
        <View className="flex-1 bg-[#fafafa]">
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
                    <TouchableOpacity>
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
            <ScrollView>
                <View className="p-4">
                    <View className="pb-2">
                        <Text
                            className="text-2xl text-headerColor-light"
                            style={{ fontFamily: "jakartaSemiBold" }}
                        >
                            Trending Posts
                        </Text>

                        <View className="mt-5 relative">
                            <TextInput
                                placeholder="Search for travel posts"
                                style={{ fontFamily: "jakartaSemiBold" }}
                                className="h-12 pl-6 text-sm bg-purple--50 border-[1px] border-purple--100 rounded-full"
                            />
                            <TouchableOpacity className="w-12 h-12 bg-purple--800 rounded-full absolute top-0 right-0 flex items-center justify-center">
                                <FontAwesome6
                                    name="bars-staggered"
                                    size={18}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <PostComponent navigation={navigation} />
                        <PostComponent navigation={navigation} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default CommunityScreen;
