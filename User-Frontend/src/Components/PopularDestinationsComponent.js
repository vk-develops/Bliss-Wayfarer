import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getSanityImageUrl } from "../Helper/sanityImg";

const DestinationCard = ({ item }) => {
    console.log(item.images);
    const imageUrl = item.images?.[0]
        ? getSanityImageUrl(item.images[0])
        : null;

    return (
        <View className="w-[300px] h-[180px] mr-4 my-4 rounded-2xl overflow-hidden shadow-lg shadow-slate-500">
            <TouchableOpacity>
                <ImageBackground
                    source={{ uri: imageUrl }}
                    className="w-full h-full"
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        className="absolute bottom-0 w-full h-[40%]"
                    />

                    <View className="absolute bottom-4 left-4">
                        <Text
                            style={{ fontFamily: "jakartaSemiBold" }}
                            className="text-white text-lg"
                        >
                            {item.name}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const PopularDestinationsComponent = ({ data }) => {
    return (
        <View>
            {data.length > 0 && (
                <FlatList
                    data={data}
                    horizontal
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index, separators }) => (
                        <DestinationCard item={item} />
                    )}
                />
            )}
        </View>
    );
};

export default PopularDestinationsComponent;
