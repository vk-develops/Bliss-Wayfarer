import { createStackNavigator } from "@react-navigation/stack";
import ItineraryScreen from "./ItineraryScreen";

const Stack = createStackNavigator();

const ItineraryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ItineraryScreen"
                component={ItineraryScreen}
            />
        </Stack.Navigator>
    );
};

export default ItineraryStack;
