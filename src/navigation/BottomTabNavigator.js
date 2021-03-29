import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import GlobalStyles from "../assets/styles/GlobalStyles";

import KalkulatorScreen from "../screens/Kalkulator";
import HomeScreen from "../screens/Home";
import RecommendScreen from "../screens/Recommend";
import DiscoverStack from "./DiscoverStack";

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
              size={25}
              color={focused ? GlobalStyles.blueColor.color : "grey"}
              focused={focused}
            />
          ),
          tabBarLabel: () => {
            return null;
          },
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
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Recommend"
        component={RecommendScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="align-center"
              size={25}
              color={focused ? GlobalStyles.blueColor.color : "grey"}
              focused={focused}
            />
          ),
          tabBarLabel: () => {
            return null;
          },
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
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
