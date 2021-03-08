import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";

import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import NewProfileScreen from "../screens/NewProfile";
import AboutScreen from "../screens/About";
import RetakeKalkulator from "../screens/RetakeKalkulator";
import RecommendScreen from "../screens/Recommend";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Tab"
        component={BottomTabNavigator}
        // options={{
        //   header: () => <CustomHeader />,
        // }}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Registrer deg" }}
      />
      <Stack.Screen
        name="NewProfile"
        component={NewProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RetakeKalkulator"
        component={RetakeKalkulator}
        options={{ title: "Legg til fag du skal ta opp" }}
      />
      <Stack.Screen
        name="Recommend"
        component={RecommendScreen}
        options={{ title: "DU kommer ikke inn" }}
      />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default Router;
