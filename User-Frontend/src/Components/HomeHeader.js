import { View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const HomeHeader = () => {
    return (
        <View className="p-4 bg-purple--800 rounded-b-[40px]">
            <View className="flex items-center justify-between flex-row">
                <TouchableOpacity className="flex items-center justify-start flex-row gap-3">
                    <View className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                        <Text
                            className="text-2xl text-purple--800"
                            style={{ fontFamily: "jakartaBold" }}
                        >
                            V
                        </Text>
                    </View>
                    <View>
                        <Text
                            className="text-base text-purple-200"
                            style={{ fontFamily: "jakartaBold" }}
                        >
                            Vimal Kumar
                        </Text>
                        <Text
                            className="text-xs text-purple--300 pt-1"
                            style={{ fontFamily: "jakartaMedium" }}
                        >
                            Chennai
                        </Text>
                    </View>
                </TouchableOpacity>
                <View className="flex items-center justify-end flex-row gap-5">
                    <TouchableOpacity>
                        <FontAwesome6
                            name="bars-staggered"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6
                            name="bars-staggered"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6
                            name="bars-staggered"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text
                    className="text-3xl text-white pt-7"
                    style={{ fontFamily: "jakartaBold" }}
                >
                    Discover
                </Text>
                <Text
                    className="text-base text-purple--300 pt-2 pb-12"
                    style={{ fontFamily: "jakartaMedium" }}
                >
                    Explore all the popular destinations around you!
                </Text>
            </View>
        </View>
    );
};

export default HomeHeader;
