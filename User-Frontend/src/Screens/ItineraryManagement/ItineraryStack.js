import { createStackNavigator } from "@react-navigation/stack";
import ItineraryScreen from "./ItineraryScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ItineraryDetailsScreen from "./ItineraryDetailsScreen";
import CreateItineraryScreen from "./CreateItineraryScreen";
import PlansScreen from "./PlansScreen";
import CreateActivityScreen from "./CreateActivityScreen";
import BookmarksScreen from "./BookMarksScreen";
import ActivityDetailScreen from "./ActivityDetailScreen";

const Stack = createStackNavigator();

const ItineraryStack = () => {
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
            })}
        >
            <Stack.Screen
                name="ItineraryScreen"
                component={ItineraryScreen}
                options={{ headerTitle: "Itinerary Management" }}
            />
            <Stack.Screen
                options={({ navigation }) => ({
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
                name="ItineraryDetailsScreen"
                component={ItineraryDetailsScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
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
                name="CreateItineraryScreen"
                component={CreateItineraryScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
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
                name="PlansScreen"
                component={PlansScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
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
                name="CreateActivityScreen"
                component={CreateActivityScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
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
                name="ActivityDetailScreen"
                component={ActivityDetailScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
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
                    presentation: "modal",
                })}
                name="BookmarksScreen"
                component={BookmarksScreen}
            />
        </Stack.Navigator>
    );
};

export default ItineraryStack;
