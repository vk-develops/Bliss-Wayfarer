import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useCreateActivityMutation } from "../../Redux/Services/activityApiSlice";

const timeSlots = ["morning", "afternoon", "evening"];

const CreateActivityScreen = ({ route }) => {
    const { itineraryId, dayNumber } = route.params;

    const navigation = useNavigation();
    const [activity, setActivity] = useState({
        name: "",
        startTime: new Date(),
        endTime: new Date(),
        references: [],
        notes: "",
        estimatedCost: "",
        timeSlot: "morning",
    });

    const [createActivity, { isLoading }] = useCreateActivityMutation();

    const handleAddReference = () => {
        navigation.navigate("BookmarkScreen", {
            onSelect: (selectedReferences) => {
                setActivity((prev) => ({
                    ...prev,
                    references: [...prev.references, ...selectedReferences],
                }));
            },
        });
    };

    if (isLoading) {
        return <ActivityIndicator size={50} />;
    }

    const handleSubmit = async () => {
        // Create properly structured payload
        const formattedData = {
            timeSlot: activity.timeSlot,
            activity: {
                name: activity.name,
                startTime: formatTime(activity.startTime), // You'll need a helper function for this
                endTime: formatTime(activity.endTime), // To convert Date to "HH:MM" format
                notes: activity.notes,
                estimatedCost: activity.estimatedCost,
                references: activity.references,
            },
        };

        console.log("Submitting activity:", formattedData);

        try {
            const res = await createActivity({
                data: formattedData,
                id: itineraryId,
                dayNumber,
            }).unwrap();
            console.log("res of actv", res);
        } catch (error) {
            console.error("Error submitting activity:", error);
        }
    };

    // Helper function to format time from Date to string
    const formatTime = (date) => {
        return date.toTimeString().slice(0, 5); // Gets "HH:MM" from the Date
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                className="p-4 bg-gray-100"
                contentContainerStyle={{ paddingBottom: 100 }}
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-2xl font-bold text-center mb-4">
                    Create Activity
                </Text>

                <Text className="text-lg font-semibold">Select Time Slot</Text>
                <View className="flex-row flex-wrap my-2">
                    {timeSlots.map((slot) => (
                        <TouchableOpacity
                            key={slot}
                            className={`px-4 py-2 rounded-full mx-1 mb-2 ${
                                activity.timeSlot === slot
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                            }`}
                            onPress={() =>
                                setActivity((prev) => ({
                                    ...prev,
                                    timeSlot: slot,
                                }))
                            }
                        >
                            <Text
                                className={`text-center capitalize ${
                                    activity.timeSlot === slot
                                        ? "text-white"
                                        : "text-black"
                                }`}
                            >
                                {slot}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="text-lg font-semibold">Activity Name</Text>
                <TextInput
                    className="border p-2 rounded-lg my-2 bg-white"
                    placeholder="Enter activity name"
                    value={activity.name}
                    onChangeText={(text) =>
                        setActivity((prev) => ({ ...prev, name: text }))
                    }
                />

                <Text className="text-lg font-semibold">Start Time</Text>
                <DateTimePicker
                    value={activity.startTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>
                        setActivity((prev) => ({
                            ...prev,
                            startTime: date || prev.startTime,
                        }))
                    }
                />

                <Text className="text-lg font-semibold mt-2">End Time</Text>
                <DateTimePicker
                    value={activity.endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>
                        setActivity((prev) => ({
                            ...prev,
                            endTime: date || prev.endTime,
                        }))
                    }
                />

                <TouchableOpacity
                    className="bg-blue-500 p-3 rounded-lg my-4"
                    onPress={handleAddReference}
                >
                    <Text className="text-white text-center font-bold">
                        Add Reference
                    </Text>
                </TouchableOpacity>

                {activity.references.length > 0 && (
                    <View className="mb-4">
                        <Text className="text-lg font-semibold mb-2">
                            References
                        </Text>
                        {activity.references.map((reference, index) => (
                            <Text
                                key={index}
                                className="text-gray-700 mb-1"
                            >
                                {reference.referenceType}:{" "}
                                {reference.referenceId}
                            </Text>
                        ))}
                    </View>
                )}

                <Text className="text-lg font-semibold">Notes</Text>
                <TextInput
                    className="border p-2 rounded-lg my-2 bg-white"
                    placeholder="Enter notes"
                    multiline={true}
                    numberOfLines={4}
                    value={activity.notes}
                    onChangeText={(text) =>
                        setActivity((prev) => ({ ...prev, notes: text }))
                    }
                />

                <Text className="text-lg font-semibold mt-2">
                    Estimated Cost
                </Text>
                <TextInput
                    className="border p-2 rounded-lg my-2 bg-white"
                    placeholder="Enter estimated cost"
                    keyboardType="numeric"
                    value={activity.estimatedCost}
                    onChangeText={(text) =>
                        setActivity((prev) => ({
                            ...prev,
                            estimatedCost: text,
                        }))
                    }
                />

                <TouchableOpacity
                    className="bg-green-500 p-3 rounded-lg my-6"
                    onPress={handleSubmit}
                >
                    <Text className="text-white text-center font-bold">
                        Submit
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateActivityScreen;
