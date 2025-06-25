import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Platform,
    ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreateItineraryMutation } from "../../Redux/Services/itineraryApiSlice";
import { useSuccessToast } from "../../Hooks/useToast";

const CreateItineraryScreen = ({ navigation }) => {
    const [tripName, setTripName] = useState("");
    const [location, setLocation] = useState("");
    const [totalBudget, setTotalBudget] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const [createItinerary, { isLoading, isError }] =
        useCreateItineraryMutation();

    const handleCreateItinerary = async () => {
        if (!tripName || !location || !startDate || !endDate || !totalBudget) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        if (endDate < startDate) {
            Alert.alert("Error", "End date cannot be before start date.");
            return;
        }

        const itineraryData = {
            tripName,
            location,
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
            totalBudget: parseInt(totalBudget, 10),
        };

        try {
            const response = await createItinerary(itineraryData).unwrap();
            if (response.success) {
                navigation.navigate("ItineraryScreen");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onStartDateChange = (event, selectedDate) => {
        setShowStartDate(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            // Reset end date if it's before the new start date
            if (endDate && endDate < selectedDate) {
                setEndDate(null);
            }
        }
    };

    const onEndDateChange = (event, selectedDate) => {
        setShowEndDate(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    if (isError) {
        return <Text>An error occurred</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator size={50} />;
    }

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Text className="text-3xl font-bold text-gray-800 mb-4">
                Create Itinerary
            </Text>

            {/* Trip Name */}
            <Text className="text-lg font-medium text-gray-700">Trip Name</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-3 my-2 text-lg"
                placeholder="Enter trip name"
                value={tripName}
                onChangeText={setTripName}
            />

            {/* Location */}
            <Text className="text-lg font-medium text-gray-700">Location</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-3 my-2 text-lg"
                placeholder="Enter location"
                value={location}
                onChangeText={setLocation}
            />

            {/* Budget */}
            <Text className="text-lg font-medium text-gray-700">
                Total Budget
            </Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-3 my-2 text-lg"
                placeholder="Enter total budget"
                keyboardType="numeric"
                value={totalBudget}
                onChangeText={setTotalBudget}
            />

            {/* Start Date */}
            <Text className="text-lg font-medium text-gray-700">
                Start Date
            </Text>
            <TouchableOpacity
                className="bg-purple--300 p-3 rounded-lg my-2"
                onPress={() => setShowStartDate(true)}
            >
                <Text className="text-white text-center text-lg">
                    {startDate ? startDate.toDateString() : "Select Start Date"}
                </Text>
            </TouchableOpacity>

            {showStartDate && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            {/* End Date */}
            <Text className="text-lg font-medium text-gray-700">End Date</Text>
            <TouchableOpacity
                className="bg-purple--300 p-3 rounded-lg my-2"
                onPress={() => setShowEndDate(true)}
            >
                <Text className="text-white text-center text-lg">
                    {endDate ? endDate.toDateString() : "Select End Date"}
                </Text>
            </TouchableOpacity>

            {showEndDate && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    minimumDate={startDate || new Date()}
                    onChange={onEndDateChange}
                />
            )}

            {/* Submit Button */}
            <TouchableOpacity
                className="bg-purple--800 p-4 rounded-lg mt-4"
                onPress={handleCreateItinerary}
            >
                <Text className="text-white text-center text-lg font-bold">
                    Create Itinerary
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateItineraryScreen;
