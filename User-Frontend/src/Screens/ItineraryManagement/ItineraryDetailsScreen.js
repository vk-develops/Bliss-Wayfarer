import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useGetAItineraryQuery } from "../../Redux/Services/itineraryApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const ItineraryDetailsScreen = ({ route }) => {
    const { id } = route.params;

    const { data, isLoading, isError } = useGetAItineraryQuery({
        id: id ? id : skipToken,
    });

    useEffect(() => {
        if (data) {
            console.log("Itinerary Data:", data);
        }
    }, [data]);

    if (isError) {
        return <Text>An error occurred</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator size={50} />;
    }

    return (
        <ScrollView className="flex-1 bg-bgColor-light">
            <View className="p-4">
                <Text className="text-2xl text-headerColor-light">
                    {data?.data?.name}
                </Text>
            </View>
        </ScrollView>
    );
};

export default ItineraryDetailsScreen;
