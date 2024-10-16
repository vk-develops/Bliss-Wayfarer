import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../Screens/Home/HomeStack";
import CommunityStack from "../Screens/Community/CommunityStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
            />
            <Tab.Screen
                name="CommunityTab"
                component={CommunityStack}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
