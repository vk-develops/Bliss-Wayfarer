import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import CommunityScreen from "./CommunityScreen";
import PostDetailScreen from "./PostDetailScreen";

const Stack = createStackNavigator();

const CommunityStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="CommunityScreen"
                component={CommunityScreen}
            />
            <Stack.Screen
                name="PostDetailScreen"
                component={PostDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default CommunityStack;
