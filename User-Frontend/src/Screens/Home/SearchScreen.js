import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchScreen = () => {
    const searchTabs = ["attractions", "travelPlaces", "hotels", "restaurants"];

    const [activeSearchTab, setActiveSearchTab] = useState(searchTabs[0]);

    return (
        <View className="bg-bgColor-light flex-1">
            <View className="shadow-lg shadow-slate-200 pb-5 bg-bgColor-light">
                <View className="m-4 pl-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full flex items-center justify-between flex-row">
                    <TextInput placeholder="Search places"></TextInput>
                    <TouchableOpacity className="h-10 w-10 bg-purple--800 rounded-full flex items-center justify-center">
                        <Ionicons
                            name="location-sharp"
                            size={16}
                            color="#555"
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-between flex-row mx-4 ">
                    {searchTabs.map((tab, index) => (
                        <TouchableOpacity
                            onPress={() => setActiveSearchTab(tab)}
                            className={`${
                                activeSearchTab == tab
                                    ? "bg-purple--800 px-3 py-1 rounded-full"
                                    : ""
                            }`}
                            key={index}
                        >
                            <Text
                                className={`capitalize text-xs ${
                                    activeSearchTab == tab
                                        ? "text-white"
                                        : "text-black"
                                }`}
                                style={{ fontFamily: "jakartaMedium" }}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <ScrollView></ScrollView>
        </View>
    );
};

export default SearchScreen;
