import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const PostSearchScreen = () => {
    const [location, setLocation] = useState("");

    const gemSearch = async (e) => {
        e.preventDefault();

        //
        // const response = await fetch(``)
    };

    return (
        <View className="flex-1 bg-[#fff]">
            <View className="mx-4 mt-4 flex items-center justify-between flex-row">
                <TextInput
                    placeholder="Search for places"
                    style={{ fontFamily: "jakartaSemiBold" }}
                    className="py-4 px-5 text-sm w-[90%] bg-purple--100 border-[1px] border-purple--300 rounded-full"
                ></TextInput>
                <TouchableOpacity>
                    <FontAwesome6
                        name="bars-staggered"
                        size={22}
                        color="purple"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostSearchScreen;
