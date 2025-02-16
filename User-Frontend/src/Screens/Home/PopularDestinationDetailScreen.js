import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";

const PopularDestinationDetailScreen = ({ route, navigation }) => {
    const { data } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: data.name,
        });
    }, [navigation, data]);

    return (
        <View>
            <Text>PopularDestinationDetailScreen</Text>
        </View>
    );
};

export default PopularDestinationDetailScreen;
