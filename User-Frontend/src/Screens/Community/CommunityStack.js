import { createStackNavigator } from "@react-navigation/stack";
import CommunityScreen from "./CommunityScreen";

const Stack = createStackNavigator();

const CommunityStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CommunityScreen"
                component={CommunityScreen}
            />
        </Stack.Navigator>
    );
};

export default CommunityStack;
