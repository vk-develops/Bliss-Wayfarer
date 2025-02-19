import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { searchAllPlaces } from "../../../sanityClient";
import { getSanityImageUrl } from "../../Helper/sanityImg";

const SearchCards = ({ item, navigation }) => {
    const imageUrl = item.images?.[0]
        ? getSanityImageUrl(item.images[0])
        : null;

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("PlaceDetailScreen", {
                    id: item._id,
                })
            }
            className="w-full mr-4 my-4"
        >
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
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);

    const onSubmit = async () => {
        try {
            if (searchQuery.trim() === "") return;

            const fetchdata = await searchAllPlaces(searchQuery);
            console.log("Fetched data:", fetchdata);
            setData(fetchdata);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <View className="bg-bgColor-light flex-1">
            <View className="shadow-lg shadow-slate-200 pb-2 bg-bgColor-light">
                <View className="m-4 pl-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full flex items-center justify-between flex-row">
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search places"
                        className="w-[50%]"
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
            </View>
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
        </View>
    );
};

export default SearchScreen;
