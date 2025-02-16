import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import PopularDestinationDetailScreen from "./PopularDestinationDetailScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PopularDestinationDetailScreen"
                component={PopularDestinationDetailScreen}
                options={({ navigation }) => ({
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
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
