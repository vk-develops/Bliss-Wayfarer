import { View, Text, TouchableOpacity } from "react-native";
import {
    DrawerItemList,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import useLogout from "../Hooks/useLogout";

const CustomDrawer = (props) => {
    const { logoutHandler } = useLogout();

    const handleLogout = async () => {
        await logoutHandler();
    };

    return (
        <View className="flex-1">
            <View className="bg-purple--800 h-56 relative">
                <TouchableOpacity className="flex items-start justify-start gap-3 absolute bottom-8 left-4">
                    <View className="h-[70px] w-[70px] bg-white rounded-full flex items-center justify-center">
                        <Text
                            className="text-2xl text-purple--800"
                            style={{ fontFamily: "jakartaBold" }}
                        >
                            V
                        </Text>
                    </View>
                    <View className="flex items-start justify-center">
                        <Text
                            className="text-2xl text-white"
                            style={{ fontFamily: "jakartaBold" }}
                        >
                            Vimal Kumar
                        </Text>
                        <Text
                            className="text-base text-purple--300 pt-1"
                            style={{ fontFamily: "jakartaMedium" }}
                        >
                            Chennai
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView
                style={{ marginTop: 10 }}
                {...props}
            >
                <DrawerItemList {...props}></DrawerItemList>
            </DrawerContentScrollView>
            <TouchableOpacity
                onPress={handleLogout}
                className="flex items-center justify-center bg-red-500 m-4 py-4 rounded-lg"
            >
                <Text
                    style={{ fontFamily: "jakartaBold" }}
                    className="text-lg text-white"
                >
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomDrawer;
