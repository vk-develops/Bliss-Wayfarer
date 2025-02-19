import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const PostSearchScreen = () => {
    const searchTypes = ["Posts", "Peoples", "Gems"];

    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearchType, setActiveSearchType] = useState(searchTypes[0]);

    return (
        <View className="flex-1 bg-bgColor-light">
            <View className="shadow-lg shadow-slate-200 pb-2 bg-bgColor-light">
                <View className="m-4 pl-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full flex items-center justify-between flex-row">
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search places"
                        className="w-[80%]"
                    />
                    <TouchableOpacity
                        // onPress={onSubmit}
                        className="h-10 w-10 bg-purple--800 rounded-full flex items-center justify-center"
                    >
                        <Ionicons
                            name="search-sharp"
                            size={16}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-between flex-row px-4 mb-2">
                    {searchTypes.map((item) => (
                        <TouchableOpacity
                            onPress={() => setActiveSearchType(item)}
                            className={` px-5 py-[5px] rounded-full ${
                                activeSearchType == item ? "bg-purple--800" : ""
                            }`}
                        >
                            <Text
                                style={{ fontFamily: "jakartaSemiBold" }}
                                className={`text-sm text-paraColor-light ${
                                    activeSearchType == item ? "text-white" : ""
                                }`}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default PostSearchScreen;
