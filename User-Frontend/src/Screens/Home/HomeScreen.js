import {
    View,
    Text,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../Components/HomeHeader";
import useLogout from "../../Hooks/useLogout";
import { useEffect, useState } from "react";
import { getPopularDestinations } from "../../../sanityClient";

const PopularDestinations = ({ data }) => {
    return (
        <View className="mx-4 pt-2">
            <Text
                className="text-2xl text-headerColor-light"
                style={{ fontFamily: "jakartaBold" }}
            >
                Popular Destinations
            </Text>
        </View>
    );
};

const Categories = () => {
    const category = [
        "Beaches",
        "Religious Sites",
        "Amusement & Theme Parks",
        "Shopping Malls",
        "Museums",
    ];

    const [selectedCat, setSelectedCat] = useState(null);

    return (
        <View className="m-4 pt-2">
            <Text
                className="text-2xl text-headerColor-light"
                style={{ fontFamily: "jakartaBold" }}
            >
                Categories
            </Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="mt-2"
            >
                {category.map((item) => (
                    <TouchableOpacity
                        onPress={() => setSelectedCat(item)}
                        className={`py-2 px-4 my-2 rounded-full mr-3 ${
                            item == selectedCat
                                ? "bg-purple--800 border-[0.5px] border-purple--800"
                                : "bg-purple--50 border-[0.5px] border-slate-300"
                        }`}
                        key={item}
                    >
                        <Text
                            style={{ fontFamily: "jakartaSemiBold" }}
                            className={`text-xs ${
                                selectedCat == item
                                    ? "text-white"
                                    : "text-headerColor-light"
                            }`}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const HomeScreen = () => {
    const { logoutHandler } = useLogout();

    const handleLogout = async () => {
        await logoutHandler();
    };

    const [popularDestinations, setPopularDestinations] = useState([]);

    const fetchDatas = async () => {
        try {
            const travelPlaceData = await getPopularDestinations();

            setPopularDestinations(travelPlaceData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#fafafa]">
            <StatusBar
                backgroundColor="#5a03d5"
                style="light"
            />
            <ScrollView>
                <HomeHeader />
                <View className="mx-4 -mt-10">
                    <TextInput
                        placeholder="Search for places"
                        style={{ fontFamily: "jakartaSemiBold" }}
                        className="py-4 px-5 text-sm bg-purple--100 border-[1px] border-purple--300 rounded-full"
                    />
                </View>

                {/* Categories section */}
                <Categories />

                {/* Popular Destination section */}
                <PopularDestinations data={popularDestinations} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
