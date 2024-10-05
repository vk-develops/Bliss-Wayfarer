import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../Components/HomeHeader";

const HomeScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <HomeHeader />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
