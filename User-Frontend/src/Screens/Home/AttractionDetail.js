import {
    View,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getAtrractionDetail } from "../../../sanityClient";
import { getSanityImageUrl } from "../../Helper/sanityImg";
import Ionicons from "@expo/vector-icons/Ionicons";

const AttractionDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [data, setData] = useState(null);

    const fetchData = async (id) => {
        const data = await getAtrractionDetail(id);
        setData(data[0]);
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.name,
        });
    }, [navigation, data]);

    console.log(data);

    return (
        <ScrollView className="flex-1 bg-bgColor-light">
            {data ? (
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
                                {data.location}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : (
                <ActivityIndicator size={50} />
            )}
        </ScrollView>
    );
};

export default AttractionDetail;
