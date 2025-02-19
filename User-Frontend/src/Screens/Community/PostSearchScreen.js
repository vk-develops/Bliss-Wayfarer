import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGemSearchQuery } from "../../Redux/Services/communityApiSlice";
import PostComponent from "../../Components/PostComponent";

const PostSearchScreen = ({ navigation }) => {
    const searchTypes = ["Posts", "Peoples", "Gems"];

    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearchType, setActiveSearchType] = useState(searchTypes[0]);
    const [results, setResults] = useState([]);

    const { data, isLoading, isError } = useGemSearchQuery(
        {
            location: searchQuery,
            limit: 10,
            page: 1,
        },
        { skip: !searchQuery }
    );

    useEffect(() => {
        if (data) {
            setResults(data.results || []);
            console.log(data.results[0].relevanceScore);
        }
    }, [data]);

    const onSubmit = () => {
        if (!searchQuery.trim()) return;
    };

    const renderItem = useCallback(
        ({ item }) => (
            <PostComponent
                post={item}
                navigation={navigation}
            />
        ),
        [navigation]
    );

    return (
        <View className="flex-1 bg-bgColor-light">
            <View className="shadow-lg shadow-slate-200 pb-2 bg-bgColor-light">
                <View className="m-4 pl-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full flex items-center justify-between flex-row">
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder={`Search ${activeSearchType.toLowerCase()}`}
                        className="w-[80%]"
                    />
                    <TouchableOpacity
                        onPress={onSubmit}
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
                            key={item}
                            onPress={() => setActiveSearchType(item)}
                            className={`px-5 py-[5px] rounded-full ${
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

            {/* Results Section */}
            <View className="flex-1 px-4">
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#5a03d5"
                        className="mt-4"
                    />
                ) : isError ? (
                    <Text className="text-center text-red-500 mt-4">
                        Error fetching results. Please try again.
                    </Text>
                ) : results.length > 0 ? (
                    <FlatList
                        data={results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text className="text-center text-paraColor-light mt-4">
                        No results found.
                    </Text>
                )}
            </View>
        </View>
    );
};

export default PostSearchScreen;
