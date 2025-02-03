import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import CommunityScreen from "./CommunityScreen";
import PostDetailScreen from "./PostDetailScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Text, TouchableOpacity, View } from "react-native";
import PostSearchScreen from "./PostSearchScreen";

const Stack = createStackNavigator();

const CommunityStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                options={{ headerShown: false }}
                name="CommunityScreen"
                component={CommunityScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    header: () => {
                        return (
                            <View className="p-4 bg-purple--800 flex items-center justify-between flex-row">
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <FontAwesome6
                                        name="bars-staggered"
                                        size={18}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <Text
                                    className="text-lg text-white text-center"
                                    style={{ fontFamily: "jakartaMedium" }}
                                >
                                    Post Details
                                </Text>
                                <Text className=" opacity-0">h</Text>
                            </View>
                        );
                    },
                })}
                name="PostDetailScreen"
                component={PostDetailScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    header: () => {
                        return (
                            <View className="p-4 bg-purple--800 flex items-center justify-between flex-row">
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <FontAwesome6
                                        name="bars-staggered"
                                        size={18}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <Text
                                    className="text-lg text-white text-center"
                                    style={{ fontFamily: "jakartaMedium" }}
                                >
                                    Search
                                </Text>
                                <Text className=" opacity-0">h</Text>
                            </View>
                        );
                    },
                })}
                name="SearchScreen"
                component={PostSearchScreen}
            />
        </Stack.Navigator>
    );
};

export default CommunityStack;
