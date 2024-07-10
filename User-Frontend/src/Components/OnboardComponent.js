import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import OnboardImg from "../../assets/images/OnboardingImg-1.png";
import { slideData } from "../Data/SlideData";

const width = Dimensions.get("window").width;

const OnboardComponent = ({
    slideItem,
    goToNextSlide,
    currentSlideIndex,
    navigation,
}) => {
    const renderIndicators = () => {
        return slideData.map((_, index) => (
            <View
                key={index}
                className={`h-[2px] w-2 bg-[#999] rounded-lg`}
                style={{
                    width: currentSlideIndex === index ? 50 : 20,
                    backgroundColor:
                        currentSlideIndex === index ? "#888" : "#ccc",
                }}
            />
        ));
    };

    return (
        <View className="flex-1">
            <View className="flex-[0.5] bg-purple--100 items-center justify-end rounded-b-[40px]">
                <Image
                    source={slideItem.image}
                    style={{ height: "85%", width, resizeMode: "contain" }}
                />
            </View>
            <View className="flex-[0.5] items-center justify-center">
                <View className="p-4">
                    <View className="flex items-center justify-center flex-row gap-2 pb-8">
                        {renderIndicators()}
                    </View>
                    <Text
                        className="text-3xl text-center text-headerColor-light"
                        style={{ fontFamily: "jakartaBold", width: width - 32 }}
                    >
                        {slideItem.title}
                    </Text>
                    <Text
                        className="text-base text-center pt-4 text-paraColor-light"
                        style={{
                            fontFamily: "jakartaRegular",
                            width: width - 32,
                        }}
                    >
                        {slideItem.description}
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
