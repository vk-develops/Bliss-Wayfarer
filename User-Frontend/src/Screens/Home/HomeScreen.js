import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../Components/HomeHeader";
import useLogout from "../../Hooks/useLogout";

const HomeScreen = () => {
    const { logoutHandler } = useLogout();

    const handleLogout = async () => {
        await logoutHandler();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#fafafa]">
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

                {/* Categories section */}
                <View className="m-4 pt-2">
                    <Text
                        className="text-2xl text-headerColor-light"
                        style={{ fontFamily: "jakartaBold" }}
                    >
                        Categories
                    </Text>
                </View>
                <Button
                    onPress={handleLogout}
                    title="logout"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
