import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useCreatePostMutation } from "../../Redux/Services/communityApiSlice";
import { useErrorToast } from "../../Hooks/useToast";

const CreatePostScreen = ({ navigation }) => {
    // Form state
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [media, setMedia] = useState([]);
    const [mediaType, setMediaType] = useState([]);
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("General");
    const [errorMsg, setErrorMsg] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);

    // RTK Query mutation hook
    const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation();

    const pickMedia = async () => {
        if (media.length >= 5) {
            Alert.alert(
                "Limit Exceeded",
                "You can only upload up to 5 media files."
            );
            return;
        }

        const hasPermission = await requestMediaLibraryPermission();
        if (!hasPermission) return;

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
                allowsMultipleSelection: true,
                quality: 1,
            });

            console.log("Image picker result:", result); // Add logging

            if (!result.canceled) {
                const selectedFiles = result.assets.slice(0, 5 - media.length);
                setMedia([...media, ...selectedFiles]);
            }
        } catch (error) {
            console.error("Error picking media:", error);
            Alert.alert("Error", "Failed to open media library");
        }
    };

    const requestMediaLibraryPermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission needed",
                "Please grant media library access to upload photos"
            );
            return false;
        }
        return true;
    };

    const requestCameraPermission = async () => {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === "granted");

        if (cameraStatus.status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "You need to allow camera access to take pictures."
            );
        }
    };

    const takePicture = async () => {
        if (hasCameraPermission === null) {
            await requestCameraPermission();
        }

        if (media.length >= 5) {
            Alert.alert(
                "Limit Exceeded",
                "You can only upload up to 5 media files."
            );
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaType.All,
            quality: 1,
        });

        if (!result.canceled) {
            setMedia([...media, result.assets[0]]);
        }
    };

    const handleSubmit = async () => {
        if (!title || !caption || !location) {
            setErrorMsg("All fields are required");
            return;
        }

        console.log("start");

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append("title", title);
            formData.append("caption", caption);
            formData.append("category", category);
            formData.append("location", location);

            // Add media files
            media.forEach((item) => {
                const uri = item.uri;
                const filename = uri.split("/").pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : "image/jpeg";

                // Use the field name "mediaFiles"
                formData.append("mediaFiles", {
                    uri,
                    name: filename,
                    type,
                });
            });

            const data = formData;

            console.log("middle");
            console.log(data);

            // Send to backend using RTK Query
            const response = await createPost(data).unwrap();
            console.log("post res", response);
            useErrorToast({ msg: "Post Flagged, offensive post detected" });
            console.log("end");
        } catch (error) {
            setErrorMsg("Error creating post: " + error.message);
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            <Text className="text-2xl font-bold mb-5 text-gray-800">
                Create New Post
            </Text>

            {errorMsg && <Text className="text-red-500 mb-4">{errorMsg}</Text>}

            {/* Title */}
            <View className="mb-4">
                <Text className="text-base font-medium mb-2 text-gray-700">
                    Title
                </Text>
                <TextInput
                    className="bg-white border border-gray-300 rounded-lg p-3 text-base"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter a title for your post"
                />
            </View>

            {/* Caption */}
            <View className="mb-4">
                <Text className="text-base font-medium mb-2 text-gray-700">
                    Caption
                </Text>
                <TextInput
                    className="bg-white border border-gray-300 rounded-lg p-3 h-24 text-base"
                    value={caption}
                    onChangeText={setCaption}
                    placeholder="Write a caption..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>

            {/* Category */}
            <View className="mb-4">
                <Text className="text-base font-medium mb-2 text-gray-700">
                    Category
                </Text>
                <View className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        className="h-12 w-full"
                    >
                        <Picker.Item
                            label="General"
                            value="General"
                        />
                        <Picker.Item
                            label="Gem"
                            value="Gem"
                        />
                        <Picker.Item
                            label="Itinerary"
                            value="Itinerary"
                        />
                    </Picker>
                </View>
            </View>

            {/* Location */}
            <View className="mb-4">
                <Text className="text-base font-medium mb-2 text-gray-700">
                    Location
                </Text>
                <TextInput
                    className="bg-white border border-gray-300 rounded-lg p-3 text-base"
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location (e.g., Paris, France)"
                />
            </View>

            {/* Media */}
            <View className="mb-4">
                <Text className="text-base font-medium mb-2 text-gray-700">
                    Media
                </Text>
                <View className="flex-row mb-2 space-x-2">
                    <TouchableOpacity
                        className="bg-blue-500 p-3 rounded-lg flex-1 items-center"
                        onPress={pickMedia}
                    >
                        <Text className="text-white font-medium">
                            Pick Image
                        </Text>
                    </TouchableOpacity>
                </View>
                {media?.length > 0 && (
                    <ScrollView
                        horizontal
                        className="mt-2"
                    >
                        {media.map((item, index) => (
                            <View
                                key={index}
                                className="mr-2 rounded-lg overflow-hidden border border-gray-300"
                            >
                                <Image
                                    source={{ uri: item.uri }}
                                    className="w-24 h-24 object-cover"
                                />
                                <TouchableOpacity
                                    className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                                    onPress={() =>
                                        setMedia(
                                            media.filter((_, i) => i !== index)
                                        )
                                    }
                                >
                                    <Text className="text-white text-xs">
                                        ×
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                className={`p-4 rounded-lg items-center mt-2 mb-8 ${
                    !title || !caption || !media || !location || isSubmitting
                        ? "bg-gray-400"
                        : "bg-green-500"
                }`}
                onPress={handleSubmit}
                disabled={!title || !caption || !location || isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator
                        size="small"
                        color="#ffffff"
                    />
                ) : (
                    <Text className="text-white text-lg font-bold">
                        Create Post
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreatePostScreen;
