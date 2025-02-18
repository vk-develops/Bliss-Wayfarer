import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../Components/HomeHeader";
import useLogout from "../../Hooks/useLogout";
import { useEffect, useState } from "react";
import {
    getFilteredAttractions,
    getPopularDestinations,
} from "../../../sanityClient";
import PopularDestinationsComponent from "../../Components/PopularDestinationsComponent";
import { getSanityImageUrl } from "../../Helper/sanityImg";
import Ionicons from "@expo/vector-icons/Ionicons";

const PopularDestinations = ({ data, navigation }) => {
    return (
        <View className="mx-4 pt-2">
            <Text
                className="text-2xl text-headerColor-light"
                style={{ fontFamily: "jakartaBold" }}
            >
                Popular Destinations
            </Text>
            <PopularDestinationsComponent
                data={data}
                navigation={navigation}
            />
        </View>
    );
};

const Categories = ({ onSelectCategory, filteredAttractions, navigation }) => {
    const category = [
        "Beaches",
        "Religious Sites",
        "Amusement & Theme Parks",
        "Shopping Malls",
        "Museums",
    ];

    const [selectedCat, setSelectedCat] = useState(null);

    const handleCategorySelect = (item) => {
        setSelectedCat(item);
        onSelectCategory(item);
    };

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
                        onPress={() => handleCategorySelect(item)}
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
            {filteredAttractions.length > 0 && (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mt-2"
                >
                    {filteredAttractions.map((item) => {
                        const imageUrl = item.images?.[0]
                            ? getSanityImageUrl(item.images[0])
                            : null;

                        return (
                            <View
                                key={item._id}
                                className="w-[200px] mr-4 my-4 shadow-lg shadow-slate-200"
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(
                                            "PlaceDetailScreen",
                                            {
                                                id: item._id,
                                            }
                                        );
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
                                        style={{
                                            fontFamily: "jakartaSemiBold",
                                        }}
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
                                                style={{
                                                    fontFamily: "jakartaMedium",
                                                }}
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
                    })}
                </ScrollView>
            )}
        </View>
    );
};

const HomeScreen = ({ navigation }) => {
    const { logoutHandler } = useLogout();

    const handleLogout = async () => {
        await logoutHandler();
    };

    const [popularDestinations, setPopularDestinations] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredAttractions, setFilteredAttractions] = useState([]);

    const fetchDatas = async () => {
        try {
            const travelPlaceData = await getPopularDestinations();

            setPopularDestinations(travelPlaceData);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFilteredAttractions = async (category) => {
        try {
            if (!category) return;
            const attractionsData = await getFilteredAttractions(category);
            setFilteredAttractions(attractionsData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);

    useEffect(() => {
        fetchFilteredAttractions(selectedCategory);
    }, [selectedCategory]);

    return (
        <SafeAreaView className="flex-1 bg-[#fafafa]">
            <StatusBar
                backgroundColor="#5a03d5"
                style="light"
            />
            <ScrollView>
                <HomeHeader />
                <TouchableOpacity
                    onPress={() => navigation.navigate("HomeSearchScreen")}
                    className="mx-4 -mt-10 py-4 px-5 text-sm bg-purple--100 border-[1px] text-black border-purple--300 rounded-full"
                >
                    <Text
                        style={{ fontFamily: "jakartaSemiBold" }}
                        className="text-paraColor-light"
                    >
                        Search
                    </Text>
                </TouchableOpacity>

                {/* Categories section */}
                <Categories
                    onSelectCategory={setSelectedCategory}
                    filteredAttractions={filteredAttractions}
                    navigation={navigation}
                />

                {/* Popular Destination section */}
                <PopularDestinations
                    data={popularDestinations}
                    navigation={navigation}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
