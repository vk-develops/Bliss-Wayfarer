import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React from "react";
import { useGetAllItinerariesQuery } from "../../Redux/Services/itineraryApiSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

const ItineraryScreen = ({ navigation }) => {
    const { data, isLoading, isError } = useGetAllItinerariesQuery();

    if (isError) {
        return <Text>An error occurred</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator size={50} />;
    }

    return (
        <ScrollView className="flex-1 bg-bgColor-light">
            <View className="p-4">
                {data?.data?.length > 0 ? (
                    data.data.map((iti) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("ItineraryDetailsScreen", {
                                    id: iti._id,
                                })
                            }
                            className="bg-white p-3 rounded-lg my-2 shadow-md shadow-slate-100"
                            key={iti._id}
                        >
                            <View className="flex items-center justify-between flex-row">
                                <Text
                                    style={{ fontFamily: "jakartaBold" }}
                                    className="text-headerColor-light text-xl"
                                >
                                    {iti.tripName}
                                </Text>
                                <Text
                                    style={{ fontFamily: "jakartaSemiBold" }}
                                    className="text-purple--800 text-sm"
                                >
                                    {iti.status}
                                </Text>
                            </View>
                            <View className="flex items-center justify-start flex-row mt-3">
                                <Ionicons
                                    name="location-sharp"
                                    size={15}
                                    color="#aaa"
                                />
                                <Text
                                    style={{ fontFamily: "jakartaSemiBold" }}
                                    className="text-xs text-[#aaa]"
                                >
                                    {iti.location}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View>
                        <Text>No itineraries available, create one</Text>
                    </View>
                )}

                <View className="h-[1px] w-full bg-[#ddd] my-4 rounded-full"></View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreateItineraryScreen")}
                    className="flex items-center justify-center flex-row border-[1px] border-slate-400 rounded-lg"
                >
                    <Ionicons
                        name="add"
                        size={20}
                        color="#1e1e1e"
                    />
                    <Text
                        style={{ fontFamily: "jakartaSemiBold" }}
                        className="text-lg text-headerColor-light py-4 px-2"
                    >
                        Create Itinerary
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ItineraryScreen;
