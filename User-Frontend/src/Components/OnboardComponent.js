import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import OnboardImg from "../../assets/images/OnboardingImg-1.png";

const width = Dimensions.get("window").width;

const OnboardComponent = ({ slideItem, goToNextSlide, navigation }) => {
    return (
        <View className="flex-1">
            <View className="flex-[0.5] bg-purple--100 items-center justify-end rounded-b-[50px]">
                <Image
                    source={OnboardImg}
                    style={{ height: "85%", width, resizeMode: "contain" }}
                />
            </View>
            <View className="flex-[0.5] items-center justify-center">
                <View className="p-4 mt-8">
                    <Text
                        className="text-3xl text-center text-headerColor-light"
                        style={{ fontFamily: "jakartaBold", width: width - 32 }}
                    >
                        Explore new travel destinations.
                    </Text>
                    <Text
                        className="text-base text-center pt-4 text-paraColor-light"
                        style={{
                            fontFamily: "jakartaRegular",
                            width: width - 32,
                        }}
                    >
                        Discover new travel destinations with Bliss Wayfarer's
                        expert travel recommendations throughout your journey.
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (slideItem.id === "3") {
                                navigation.navigate("LoginScreen");
                            } else {
                                goToNextSlide();
                            }
                        }}
                        className="bg-purple--800 flex items-center justify-center rounded-full mt-10"
                    >
                        <View className="flex items-center justify-center gap-3 flex-row py-[14px]">
                            <Text
                                className="text-white text-xl"
                                style={{ fontFamily: "jakartaSemiBold" }}
                            >
                                {slideItem.id === "3" ? "Continue" : "Next"}
                            </Text>
                            <AntDesign
                                name="arrowright"
                                size={24}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default OnboardComponent;
