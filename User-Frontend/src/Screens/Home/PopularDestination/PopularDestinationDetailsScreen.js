import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import { getSanityImageUrl } from "../../../Helper/sanityImg";

const AttractionCard = ({ item }) => {
    const imageUrl = item.images?.[0]
        ? getSanityImageUrl(item.images[0])
        : null;

    console.log("item", item);

    return (
        <View className="w-[180px] h-[180px] mr-4 my-4 rounded-2xl overflow-hidden shadow-lg shadow-slate-500">
            {/* <TouchableOpacity
                onPress={() => {
                    navigation.navigate("PopularDestinationDetailsScreen", {
                        data: item,
                        title: item.name,
                    });
                }}
            >
                <ImageBackground
                    source={{ uri: imageUrl }}
                    className="w-full h-full"
                ></ImageBackground>
            </TouchableOpacity> */}
        </View>
    );
};

const PopularDestinationDetailsScreen = ({ route }) => {
    const { data } = route.params;

    console.log(data.attractions);

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
                <View className="pt-4">
                    <Text
                        style={{ fontFamily: "jakartaBold" }}
                        className="text-2xl text-headerColor-light"
                    >
                        Popular Attractions
                    </Text>
                    {Array.isArray(data.attraction) &&
                        data.attraction.length > 0 && (
                            <FlatList
                                data={[data.attraction]} // Wrap in an array if it's an object
                                horizontal
                                keyExtractor={(item) => item._id}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <AttractionCard item={item} />
                                )}
                            />
                        )}
                </View>
            </View>
        </ScrollView>
    );
};

export default PopularDestinationDetailsScreen;
