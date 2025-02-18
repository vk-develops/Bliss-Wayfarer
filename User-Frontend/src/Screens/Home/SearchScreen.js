import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { searchAllPlaces } from "../../../sanityClient";
import { getSanityImageUrl } from "../../Helper/sanityImg";

const SearchCards = ({ item, navigation }) => {
    const imageUrl = item.images?.[0]
        ? getSanityImageUrl(item.images[0])
        : null;

    return (
        <TouchableOpacity className="w-full mr-4 my-4">
            <Image
                className="w-full h-[190px] rounded-2xl overflow-hidden shadow-lg"
                source={{ uri: imageUrl }}
            />
            <View className="flex items-start justify-start mt-2">
                <Text
                    style={{ fontFamily: "jakartaMedium" }}
                    className="bg-purple--800 px-2 py-1 text-white capitalize rounded-md text-[10px]"
                >
                    {item._type}
                </Text>
            </View>
            <Text
                style={{ fontFamily: "jakartaBold" }}
                className="text-xl text-headerColor-light pt-2"
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};

const SearchScreen = ({ navigation }) => {
    const searchTabs = ["attractions", "travelPlaces", "hotels", "restaurants"];

    const [activeSearchTab, setActiveSearchTab] = useState(searchTabs[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);

    const onSubmit = async () => {
        try {
            if (searchQuery.trim() === "") return;

            const fetchdata = await searchAllPlaces(searchQuery);
            console.log("Fetched data:", fetchdata); // ✅ Log correct data
            setData(fetchdata);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log("Updated data:", data);
    }, [data]);

    return (
        <View className="bg-bgColor-light flex-1">
            <View className="shadow-lg shadow-slate-200 pb-5 bg-bgColor-light">
                <View className="m-4 pl-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full flex items-center justify-between flex-row">
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search places"
                    />
                    <TouchableOpacity
                        onPress={onSubmit}
                        className="h-10 w-10 bg-purple--800 rounded-full flex items-center justify-center"
                    >
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
            <ScrollView>
                {data?.length > 0 ? (
                    <FlatList
                        className="p-4"
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <SearchCards
                                key={item._id}
                                item={item}
                                navigation={navigation}
                            />
                        )}
                    />
                ) : (
                    <Text>No results found</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default SearchScreen;
