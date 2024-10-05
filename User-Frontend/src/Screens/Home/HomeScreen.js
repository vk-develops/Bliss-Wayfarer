import { View, Text, ScrollView, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../Components/HomeHeader";

const HomeScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar
                backgroundColor="#5a03d5"
                style="light"
            />
            <ScrollView>
                <HomeHeader />
                <View className="mx-4 -mt-10">
                    <TextInput
                        placeholder="Search for places"
                        style={{ fontFamily: "jakartaSemiBold" }}
                        className="py-4 px-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
