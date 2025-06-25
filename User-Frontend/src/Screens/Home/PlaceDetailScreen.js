import {
    View,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getPlaceDetail } from "../../../sanityClient";
import { getSanityImageUrl } from "../../Helper/sanityImg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBookmarkPlaceMutation } from "../../Redux/Services/userAccountApiSlice";

const PlaceDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [data, setData] = useState(null);

    const fetchData = async (id) => {
        const data = await getPlaceDetail(id);
        setData(data[0]);
    };

    const [bookmarkPlace] = useBookmarkPlaceMutation();

    useEffect(() => {
        fetchData(id);
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.name,
        });
    }, [navigation, data]);

    const handleBookmark = async (placeId) => {
        try {
            console.log("Bookmarking place:", placeId);
            const res = await bookmarkPlace({ placeId }).unwrap();
            console.log("Bookmark response:", res);
        } catch (error) {
            console.error("Error bookmarking place:", error);
        }
    };

    return (
        <ScrollView className="flex-1 bg-bgColor-light">
            {data ? (
                <>
                    <View className="h-64 relative">
                        <FlatList
                            data={data.images}
                            horizontal
                            scrollEnabled
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Image
                                    source={{
                                        uri: getSanityImageUrl(item),
                                    }}
                                    className="w-screen h-full"
                                    resizeMode="cover"
                                />
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => handleBookmark(data._id)}
                            className="absolute top-4 right-4 bg-purple--800 p-2 rounded-full"
                        >
                            <Ionicons
                                name="bookmark"
                                size={18}
                                color="#ffff"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="p-4">
                        <Text
                            style={{ fontFamily: "jakartaBold" }}
                            className="text-3xl text-headerColor-light"
                        >
                            {data.name}
                        </Text>
                        <Text
                            style={{ fontFamily: "jakartaMedium" }}
                            className="text-base text-paraColor-light pt-4"
                        >
                            {data.description}
                        </Text>
                        <View className="flex items-center justify-start flex-row mt-4">
                            <Ionicons
                                name="location-sharp"
                                size={18}
                                color="#5a03d5"
                            />
                            <Text
                                style={{ fontFamily: "jakartaMedium" }}
                                className="text-base text-purple--800"
                            >
                                {data.location}
                            </Text>
                        </View>
                        <Text
                            className="text-base pt-3"
                            style={{ fontFamily: "jakartaSemiBold" }}
                        >
                            ⭐{data.starRating} {"Rating"}
                        </Text>
                    </View>
                </>
            ) : (
                <ActivityIndicator size={50} />
            )}
        </ScrollView>
    );
};

export default PlaceDetailScreen;
