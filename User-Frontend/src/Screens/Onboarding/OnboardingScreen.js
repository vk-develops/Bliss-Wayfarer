import { FlatList, View, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import OnboardComponent from "../../Components/OnboardComponent";
import { slideData } from "../../Data/SlideData";
import { StatusBar } from "expo-status-bar";

const OnboardingScreen = ({ navigation }) => {
    const slideRef = useRef();

    const width = Dimensions.get("window").width;

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slideData.length) {
            const offset = nextSlideIndex * width;
            slideRef?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    return (
        <View className="flex-1">
            <StatusBar backgroundColor="#f3f1ff" />
            <FlatList
                ref={slideRef}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slideData}
                pagingEnabled
                renderItem={({ item }) => (
                    <OnboardComponent
                        slideItem={item}
                        goToNextSlide={goToNextSlide}
                        currentSlideIndex={currentSlideIndex}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    );
};

export default OnboardingScreen;
