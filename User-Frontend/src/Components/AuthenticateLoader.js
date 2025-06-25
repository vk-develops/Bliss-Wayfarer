import { View, Text, ActivityIndicator } from "react-native";

const AuthenticateLoader = ({ title }) => {
    return (
        <View className="flex-1 items-center justify-center min-h-screen bg-white">
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator
                    size={80}
                    color={"#5a03d5"}
                />
                <Text
                    className="text-purple--800 text-2xl text-center pt-6"
                    style={{ fontFamily: "jakartaSemiBold" }}
                >
                    {title}
                </Text>
            </View>
        </View>
    );
};

export default AuthenticateLoader;
