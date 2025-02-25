import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetAItineraryQuery } from "../../Redux/Services/itineraryApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { Feather } from "@expo/vector-icons";

const ItineraryDetailsScreen = ({ route, navigation }) => {
    const { id } = route.params;

    const { data, isLoading, isError } = useGetAItineraryQuery({
        id: id ? id : skipToken,
    });

    const [itinerary, setItinerary] = useState(null);

    useEffect(() => {
        if (data) {
            setItinerary(data.data);
        }
    }, [data]);

    if (isError) {
        return <Text>An error occurred</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator size={50} />;
    }

    console.log(itinerary);

    return (
        <ScrollView className="flex-1 bg-bgColor-light">
            {itinerary && (
                <View className="m-4">
                    <View className="bg-purple--500 rounded-xl p-6 shadow-lg">
                        <Text className="text-white text-2xl font-bold">
                            {itinerary.tripName}
                        </Text>
                        <Text className="text-white text-lg mt-1">
                            {itinerary.location}
                        </Text>
                        <Text className="text-white mt-2">
                            {format(
                                new Date(itinerary.startDate),
                                "MMM dd, yyyy"
                            )}{" "}
                            -{" "}
                            {format(
                                new Date(itinerary.endDate),
                                "MMM dd, yyyy"
                            )}
                        </Text>
                        <Text className="text-white mt-2">
                            Total Budget: ₹
                            {itinerary.totalBudget.toLocaleString()}
                        </Text>
                        <Text className="text-white mt-2">
                            Status: {itinerary.status}
                        </Text>
                        <Text className="text-white mt-2">
                            Admin: {itinerary.admin.name} (
                            {itinerary.admin.email})
                        </Text>
                    </View>

                    <Text className="text-xl font-semibold mt-6 mb-4">
                        Daily Plans
                    </Text>
                    {itinerary.dayPlans.map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-lg shadow-slate-100 mb-4 flex-row items-center"
                            onPress={() =>
                                navigation.navigate("PlansScreen", {
                                    itinerary,
                                })
                            }
                        >
                            <Feather
                                name="calendar"
                                size={24}
                                color="#3b82f6"
                                className="mr-4"
                            />
                            <View className="flex-1 ml-3">
                                <Text className="text-lg font-semibold">
                                    Day {index + 1}
                                </Text>
                                <Text className="text-gray-600">
                                    {format(
                                        new Date(itinerary.startDate),
                                        "MMMM dd, yyyy"
                                    )}
                                </Text>
                            </View>
                            <Feather
                                name="chevron-right"
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default ItineraryDetailsScreen;
