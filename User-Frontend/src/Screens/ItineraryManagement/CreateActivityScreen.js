import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCreateActivityMutation } from "../../Redux/Services/activityApiSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

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

    const [itiID, setItiID] = useState(itineraryId);

    const [createActivity, { isLoading }] = useCreateActivityMutation();

    // Listen for when the screen comes into focus to handle returning from BookmarksScreen
    useFocusEffect(
        React.useCallback(() => {
            // Check if a reference was selected and passed back
            if (route.params?.selectedReference) {
                const newReference = route.params.selectedReference;

                // Only add if it's not already in the references array
                const referenceExists = activity.references.some(
                    (ref) =>
                        ref.referenceId === newReference.referenceId &&
                        ref.referenceType === newReference.referenceType
                );

                if (!referenceExists) {
                    setActivity((prev) => ({
                        ...prev,
                        references: [...prev.references, newReference],
                    }));

                    // console.log("Added reference:", newReference);
                    // console.log("All references:", [
                    //     ...activity.references,
                    //     newReference,
                    // ]);
                }

                // Clear the parameter to prevent duplicate additions
                navigation.setParams({ selectedReference: undefined });
            }

            // Check if itineraryId was passed back
            if (route.params?.itineraryId) {
                setItiID(route.params.itineraryId);
                navigation.setParams({ itineraryId: undefined }); //Clear the parameter
            }
        }, [route.params?.selectedReference, route.params?.itineraryId])
    );

    if (isLoading) {
        return <ActivityIndicator size={50} />;
    }

    const handleSubmit = async () => {
        if (!activity.name) {
            Alert.alert("Error", "Please enter an activity name");
            return;
        }

        if (!itiID) {
            Alert.alert("Error", "Missing itinerary ID");
            console.error("Missing itinerary ID:", itiID);
            return;
        }

        const formattedData = {
            timeSlot: activity.timeSlot,
            activity: {
                name: activity.name,
                startTime: formatTime(activity.startTime),
                endTime: formatTime(activity.endTime),
                notes: activity.notes,
                estimatedCost: activity.estimatedCost,
                references: activity.references.map((ref) => ({
                    referenceId: ref.referenceId,
                    referenceType: ref.referenceType,
                    type: ref.type,
                })),
            },
        };

        console.log(
            "Submitting activity with data:",
            JSON.stringify(formattedData.activity.references)
        );

        try {
            const res = await createActivity({
                data: formattedData,
                id: itiID,
                dayNumber: dayNumber,
            }).unwrap();

            console.log("Activity creation successful:", res);
            Alert.alert("Success", "Activity created successfully");
            navigation.goBack(); // Navigate back after successful submission
        } catch (error) {
            console.error("Error submitting activity:", error);
            Alert.alert(
                "Error",
                "Failed to create activity. Please try again."
            );
        }
    };

    // Helper function to format time from Date to string
    const formatTime = (date) => {
        return date.toTimeString().slice(0, 5); // Gets "HH:MM" from the Date
    };

    // Remove a reference
    const removeReference = (index) => {
        setActivity((prev) => ({
            ...prev,
            references: prev.references.filter((_, i) => i !== index),
        }));
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
                    onChange={(event, date) => {
                        if (date) {
                            setActivity((prev) => ({
                                ...prev,
                                startTime: date,
                            }));
                        }
                    }}
                />

                <Text className="text-lg font-semibold mt-2">End Time</Text>
                <DateTimePicker
                    value={activity.endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        if (date) {
                            setActivity((prev) => ({
                                ...prev,
                                endTime: date,
                            }));
                        }
                    }}
                />

                <TouchableOpacity
                    className="bg-blue-500 p-3 rounded-lg my-4"
                    onPress={() =>
                        navigation.navigate("BookmarksScreen", {
                            itineraryId,
                            dayNumber,
                        })
                    }
                >
                    <Text className="text-white text-center font-bold">
                        Add Reference
                    </Text>
                </TouchableOpacity>

                {activity.references.length > 0 && (
                    <View className="mb-4">
                        <Text className="text-lg font-semibold mb-2">
                            References ({activity.references.length})
                        </Text>
                        {activity.references.map((reference, index) => (
                            <View
                                key={index}
                                className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 border border-gray-200"
                            >
                                <View>
                                    <Text className="text-gray-700 font-medium">
                                        {reference.name}
                                    </Text>
                                    <Text className="text-gray-500 text-sm capitalize">
                                        Type: {reference.referenceType}
                                    </Text>
                                    <Text
                                        className="text-gray-400 text-xs"
                                        numberOfLines={1}
                                    >
                                        ID: {reference.referenceId}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => removeReference(index)}
                                    className="p-2"
                                >
                                    <Ionicons
                                        name="close-circle"
                                        size={24}
                                        color="red"
                                    />
                                </TouchableOpacity>
                            </View>
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
                    disabled={isLoading}
                >
                    <Text className="text-white text-center font-bold">
                        {isLoading ? "Creating..." : "Submit"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateActivityScreen;
