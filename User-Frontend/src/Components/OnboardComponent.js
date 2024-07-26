import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
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
                className={`h-[2px] w-2 rounded-full`}
                style={{
                    width: currentSlideIndex === index ? 30 : 12,
                    backgroundColor:
                        currentSlideIndex === index ? "#4e4e4e" : "#8e8e8e",
                }}
            />
        ));
    };

    return (
        <View className="flex-1">
            <Animated.View
                entering={FadeInUp.duration(800).springify()}
                className="flex-[0.5] bg-purple--50 items-center justify-end rounded-b-[40px]"
            >
                <Image
                    source={slideItem.image}
                    style={{ height: "85%", width, resizeMode: "contain" }}
                />
            </Animated.View>
            <View className="flex-[0.5] items-center justify-center">
                <View className="p-4">
                    <View className="flex items-center justify-center flex-row gap-2 pb-8">
                        {renderIndicators()}
                    </View>
                    <Animated.Text
                        entering={FadeInDown.duration(600).springify()}
                        className="text-3xl text-center text-headerColor-light"
                        style={{ fontFamily: "jakartaBold", width: width - 32 }}
                    >
                        {slideItem.title}
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInDown.duration(900).springify()}
                        className="text-base text-center pt-4 text-paraColor-light"
                        style={{
                            fontFamily: "jakartaRegular",
                            width: width - 32,
                        }}
                    >
                        {slideItem.description}
                    </Animated.Text>
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (slideItem.id === "3") {
                                    navigation.replace("AuthStack");
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
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default OnboardComponent;
