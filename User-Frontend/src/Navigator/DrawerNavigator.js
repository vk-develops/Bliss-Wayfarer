import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerType: "slide", headerShown: false }}
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={TabNavigator}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
