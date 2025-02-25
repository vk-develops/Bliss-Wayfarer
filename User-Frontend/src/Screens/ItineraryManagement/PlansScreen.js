import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { format } from "date-fns";
import Ionicons from "@expo/vector-icons/Ionicons";

const PlansScreen = ({ route }) => {
    const { itinerary } = route.params;

    console.log("iti", itinerary);

    return (
        <ScrollView className="flex-1 p-4 bg-gray-100">
            {/* Trip Details */}
            <View className="bg-blue-600 p-6 rounded-xl shadow-lg mb-4">
                <Text className="text-white text-2xl font-bold">
                    {itinerary.tripName}
                </Text>
                <Text className="text-white text-lg mt-1">
                    {itinerary.location}
                </Text>
                <Text className="text-white mt-2">
                    {format(new Date(itinerary.startDate), "MMM dd, yyyy")} -{" "}
                    {format(new Date(itinerary.endDate), "MMM dd, yyyy")}
                </Text>
                <Text className="text-white mt-2">
                    Total Budget: ₹{itinerary.totalBudget.toLocaleString()}
                </Text>
            </View>

            {/* Day Plans */}
            {itinerary.dayPlans.map((day) => (
                <View
                    key={day.dayNumber}
                    className="bg-white p-4 mb-4 rounded-lg shadow"
                >
                    <View className="flex-row items-center justify-between">
                        <Text className="text-xl font-semibold">
                            Day {day.dayNumber} -{" "}
                            {format(new Date(day.date), "MMM dd, yyyy")}
                        </Text>

                        <TouchableOpacity className="bg-purple--800 p-2 rounded-full">
                            <Ionicons
                                name="create-outline"
                                size={20}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Time Slots */}
                    {day.timeSlots.map((slot) => (
                        <View
                            key={slot.slot}
                            className="mt-3"
                        >
                            <Text className="text-lg font-semibold text-blue-600">
                                {slot.slot.charAt(0).toUpperCase() +
                                    slot.slot.slice(1)}
                            </Text>

                            {/* Activities */}
                            {slot.activities.map((activity, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-100 p-3 rounded-lg mt-2"
                                >
                                    <Text className="text-base font-medium">
                                        {activity.name}
                                    </Text>
                                    <Text className="text-sm text-gray-600">
                                        {activity.startTime} -{" "}
                                        {activity.endTime}
                                    </Text>

                                    {/* References (Places/Posts) */}
                                    {activity.references.map((ref, idx) => (
                                        <Text
                                            key={idx}
                                            className="text-sm text-gray-500"
                                        >
                                            {ref.type === "sanity"
                                                ? `Place: ${ref.referenceType}`
                                                : "Post"}
                                        </Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            ))}

            {/* Add Reference Button */}
            <TouchableOpacity
                className="bg-green-600 p-4 rounded-lg mt-4"
                onPress={() => navigation.navigate("BookmarksScreen", { id })}
            >
                <Text className="text-white text-center font-bold">
                    Add Reference
                </Text>
            </TouchableOpacity>

            {/* Edit Plan Button */}
            <TouchableOpacity
                className="bg-blue-600 p-4 rounded-lg mt-4"
                onPress={() => navigation.navigate("EditPlanScreen", { id })}
            >
                <Text className="text-white text-center font-bold">
                    Edit Plan
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PlansScreen;
