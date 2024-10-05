import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: "slide",
                headerShown: false,
                drawerStyle: {
                    width: Dimensions.get("window").width / 1.3,
                    backgroundColor: "#fff",
                },
                drawerLabelStyle: {
                    fontFamily: "jakartaSemiBold",
                    fontSize: 16,
                    // marginLeft: -8,
                },
                drawerActiveTintColor: "#5a03d5",
                drawerInactiveTintColor: "#aaa",
            }}
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={TabNavigator}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
