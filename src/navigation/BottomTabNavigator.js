import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import GlobalStyles from "../assets/styles/GlobalStyles";

import KalkulatorScreen from "../screens/Kalkulator";
import HomeScreen from "../screens/Home";
import DiscoverStack from "./DiscoverStack";
import RecommendStack from "./RecommendStack";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: GlobalStyles.blueColor.color }}
    >
      <Tab.Screen
        name="Hjem"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={30}
              color={focused ? GlobalStyles.blueColor.color : "grey"}
              focused={focused}
            />
          ),
          tabBarLabel: "Hjem",
        }}
      />
      <Tab.Screen
        name="Kalkulator"
        component={KalkulatorScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="calculator"
              size={25}
              color={focused ? GlobalStyles.blueColor.color : "grey"}
              focused={focused}
            />
          ),
          tabBarLabel: "Kalkulator",
        }}
      />
      <Tab.Screen
        name="RecommendStack"
        component={RecommendStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="align-center"
              size={25}
              color={focused ? GlobalStyles.blueColor.color : "grey"}
              focused={focused}
            />
          ),
          tabBarLabel: "Øk snittet",
        }}
      />
      <Tab.Screen
        name="Utforsk"
        component={DiscoverStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="search"
              size={25}
              color={focused ? GlobalStyles.blueColor.color : "grey"}
              focused={focused}
            />
          ),
          tabBarLabel: "Utdanninger",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
