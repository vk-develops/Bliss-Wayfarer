import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getPlaceDetail } from "../../../sanityClient";
import { useGetAPostQuery } from "../../Redux/Services/communityApiSlice";
import { getSanityImageUrl } from "../../Helper/sanityImg";

const ReferenceItem = ({ reference, placesData, navigation }) => {
    const { data: postData, isLoading: postLoading } = useGetAPostQuery(
        { id: reference.referenceId },
        {
            skip: reference.type !== "post",
        }
    );

    if (reference.type === "post") {
        if (postLoading)
            return (
                <ActivityIndicator
                    size="small"
                    color="blue"
                />
            );
        return <View className="w-[200px]"></View>;
    }

    if (reference.type === "sanity") {
        const placeData = placesData[reference.referenceId];

        return (
            <ScrollView className="mt-10">
                <Text
                    style={{ fontFamily: "jakartaSemiBold" }}
                    className="text-2xl pb-5"
                >
                    Places References
                </Text>
                {placeData.map((item, index) => {
                    const imgUrl = getSanityImageUrl(item.images[0]);

                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("PlaceDetailScreen", {
                                    id: item._id,
                                })
                            }
                            key={index}
                            className="w-[200px] overflow-hidden"
                        >
                            <Image
                                className="w-full h-[100px] rounded-lg "
                                source={{ uri: imgUrl }}
                            />
                            <Text
                                style={{ fontFamily: "jakartaSemiBold" }}
                                className="text-xl pt-2"
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    return null;
};

const ActivityDetailScreen = ({ route, navigation }) => {
    const { activity } = route.params;

    const [places, setPlaces] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchPlaces = async () => {
        if (!activity.references) {
            setLoading(false);
            return;
        }

        const placeRefs = activity.references.filter(
            (ref) => ref.type === "sanity"
        );

        if (placeRefs.length === 0) {
            setLoading(false);
            return;
        }

        try {
            const fetchedPlaces = await Promise.all(
                placeRefs.map(async (ref) => {
                    const place = await getPlaceDetail(ref.referenceId);
                    return { id: ref.referenceId, details: place };
                })
            );

            // Convert to an object for easier lookup
            const placesMap = fetchedPlaces.reduce((acc, place) => {
                acc[place.id] = place.details;
                return acc;
            }, {});

            setPlaces(placesMap);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [activity.references]);

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {activity.name}
            </Text>
            <Text>Start Time: {activity.startTime}</Text>
            <Text>End Time: {activity.endTime}</Text>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                />
            ) : (
                <FlatList
                    data={activity.references || []}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ReferenceItem
                            reference={item}
                            placesData={places}
                            navigation={navigation}
                        />
                    )}
                />
            )}
        </View>
    );
};

export default ActivityDetailScreen;
