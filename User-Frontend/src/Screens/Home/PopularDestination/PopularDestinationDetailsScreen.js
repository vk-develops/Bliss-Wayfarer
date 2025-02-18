import {
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { getSanityImageUrl } from "../../../Helper/sanityImg";
import Ionicons from "@expo/vector-icons/Ionicons";

const PopularCard = ({ item, navigation }) => {
    const imageUrl = item.images?.[0]
        ? getSanityImageUrl(item.images[0])
        : null;

    console.log("item", item.location);

    return (
        <View className="w-[200px] mr-4 my-4 shadow-lg shadow-slate-200">
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("PlaceDetailScreen", {
                        id: item._id,
                    });
                }}
            >
                <View>
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-[180px] rounded-2xl overflow-hidden"
                    />
                </View>
                <Text
                    className="text-base pt-1 text-headerColor-light"
                    style={{ fontFamily: "jakartaSemiBold" }}
                >
                    {item.name}
                </Text>
                <View className="flex items-center justify-between flex-row">
                    <View className="flex items-center justify-start flex-row mt-2">
                        <Ionicons
                            name="location-sharp"
                            size={16}
                            color="#555"
                        />
                        <Text
                            style={{ fontFamily: "jakartaMedium" }}
                            className="text-xs text-paraColor-light"
                        >
                            {item.location.split(",")[0]}
                        </Text>
                    </View>
                    <Text className="mt-2 mr-4 text-xs">
                        ⭐ {item.starRating}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const PopularDestinationDetailsScreen = ({ route, navigation }) => {
    const { data } = route.params;

    return (
        <ScrollView className="flex-1 bg-bgColor-light">
            <View className="h-64">
                <FlatList
                    data={data.images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: getSanityImageUrl(item) }}
                            className="w-screen h-full"
                            resizeMode="cover"
                        />
                    )}
                />
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
                    {data.about}
                </Text>
                {data.attractions.length > 0 && (
                    <View className="pt-4">
                        <Text
                            style={{ fontFamily: "jakartaBold" }}
                            className="text-2xl text-headerColor-light pb-2"
                        >
                            Popular Attractions
                        </Text>

                        <FlatList
                            data={data.attractions}
                            horizontal
                            keyExtractor={(item) => item._id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <PopularCard
                                    item={item}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                )}
                {data.hotels?.length > 0 && (
                    <View className="pt-4">
                        <Text
                            style={{ fontFamily: "jakartaBold" }}
                            className="text-2xl text-headerColor-light pb-2"
                        >
                            Popular Hotels
                        </Text>

                        <FlatList
                            data={data.hotels}
                            horizontal
                            keyExtractor={(item) => item._id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <PopularCard
                                    item={item}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                )}
                {data.restaurants?.length > 0 && (
                    <View className="pt-4">
                        <Text
                            style={{ fontFamily: "jakartaBold" }}
                            className="text-2xl text-headerColor-light pb-2"
                        >
                            Popular Restaurants
                        </Text>

                        <FlatList
                            data={data.restaurants}
                            horizontal
                            keyExtractor={(item) => item._id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <PopularCard
                                    item={item}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default PopularDestinationDetailsScreen;
