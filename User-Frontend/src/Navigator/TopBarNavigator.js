import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Overview from "../Screens/Home/PopularDestination/Overview";

const TopTab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
    return (
        <TopTab.Navigator key="Details">
            <TopTab.Screen
                options={{
                    tabBarLabel: "Overview",
                }}
                name="Overview"
                component={Overview}
                key="overview"
            />
        </TopTab.Navigator>
    );
};

export default TopBarNavigator;
