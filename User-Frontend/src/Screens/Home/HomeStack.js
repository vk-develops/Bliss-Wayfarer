import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PopularDestinationDetailsScreen from "./PopularDestination/PopularDestinationDetailsScreen";
import PlaceDetailScreen from "./PlaceDetailScreen";
import SearchScreen from "./SearchScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PopularDestinationDetailsScreen"
                component={PopularDestinationDetailsScreen}
                options={({ route }) => ({
                    headerTitle: route.params?.title,
                })}
            />
            <Stack.Screen
                name="PlaceDetailScreen"
                component={PlaceDetailScreen}
            />
            <Stack.Screen
                name="HomeSearchScreen"
                component={SearchScreen}
                options={{
                    headerTitle: "Search",
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
