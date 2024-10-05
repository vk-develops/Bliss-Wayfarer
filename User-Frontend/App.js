import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import OnboardingStack from "./src/Screens/Onboarding/OnboardingStack";
import DrawerNavigator from "./src/Navigator/DrawerNavigator";

export default function App() {
    const [fontsLoaded] = useFonts({
        jakartaRegular: require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
        jakartaMedium: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
        jakartaSemiBold: require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
        jakartaBold: require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View className="flex-1">
            <StatusBar style="auto" />
            <NavigationContainer>
                {/* <OnboardingStack /> */}
                <DrawerNavigator />
            </NavigationContainer>
        </View>
    );
}
