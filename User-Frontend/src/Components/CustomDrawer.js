import { View, Text, TouchableOpacity } from "react-native";
import {
    DrawerItemList,
    DrawerContentScrollView,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
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
        </View>
    );
};

export default CustomDrawer;
