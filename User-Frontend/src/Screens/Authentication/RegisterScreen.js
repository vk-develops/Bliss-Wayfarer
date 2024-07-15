import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import Logo from "../../../assets/images/BW-Logo.png";

const RegisterScreen = () => {
    return (
        <ScrollView className="bg-bgColor-light">
            <View className="flex items-center justify-center">
                <Image
                    source={Logo}
                    className="h-[100px]"
                    style={{ resizeMode: "contain" }}
                />
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
