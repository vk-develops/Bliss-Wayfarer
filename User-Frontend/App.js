import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import OnboardingScreen from "./src/Screens/Onboarding/OnboardingScreen";

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
            <OnboardingScreen />
        </View>
    );
}
