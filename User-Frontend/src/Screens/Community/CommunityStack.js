import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import CommunityScreen from "./CommunityScreen";
import PostDetailScreen from "./PostDetailScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import PostSearchScreen from "./PostSearchScreen";
import CreatePostScreen from "./CreatePostScreen";

const Stack = createStackNavigator();

const CommunityStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    height: 55,
                    backgroundColor: "#5a03d5",
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontFamily: "jakartaSemiBold",
                    color: "#fff",
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack("HomeScreen")}
                        style={{ paddingLeft: 8 }}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen
                options={{ headerShown: false }}
                name="CommunityScreen"
                component={CommunityScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Post Details",
                }}
                name="PostDetailScreen"
                component={PostDetailScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Community Search",
                }}
                name="SearchScreen"
                component={PostSearchScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Create Post",
                }}
                name="CreatePostScreen"
                component={CreatePostScreen}
            />
        </Stack.Navigator>
    );
};

export default CommunityStack;
