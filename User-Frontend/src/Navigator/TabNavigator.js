import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../Screens/Home/HomeStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
