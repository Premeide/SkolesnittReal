import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GlobalStyles from "../assets/styles/GlobalStyles";

import BottomTabNavigator from "./BottomTabNavigator";

import NewProfileScreen from "../screens/NewProfile";
import AboutScreen from "../screens/About";
import DiscoverScreen from "../screens/Discover";
import ProfileScreen from "../screens/Profile";
import RetakeKalkulatorScreen from "../screens/RetakeKalkulator";
import QuestionsScreen from "../screens/Questions";
import FeedbackScreen from "../screens/Feedback";
import EducationDetailsScreen from "../screens/EducationDetails";
import KalkulatorScreen from "../screens/Kalkulator";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewProfile"
        component={NewProfileScreen}
        options={{
          headerTitle: "Ny profil",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />

      <Stack.Screen
        name="_Kalkulator"
        component={KalkulatorScreen}
        options={{
          headerTitle: "Legg til fagene dine",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerTitle: "Hva ønsker du å studere?",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: GlobalStyles.blueColor.color,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="_EducationDetails"
        component={EducationDetailsScreen}
        options={{
          headerTitle: "Utdanninger",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="EducationDetails"
        component={EducationDetailsScreen}
        options={{
          headerTitle: "Utdanninger",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profil",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: "Om",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="Questions"
        component={QuestionsScreen}
        options={{
          headerTitle: "Vanlige spørsmål",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerTitle: "Tilbakemelding",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      <Stack.Screen
        name="RetakeKalkulator"
        component={RetakeKalkulatorScreen}
        options={{
          headerTitle: "Legg til fag du skal ta opp",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: GlobalStyles.blueColor.color,
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;

//MANGLER:
/*
  - 23-5 poeng
  - recommend data functions
  - about
  - faq
  - feedback

  Optimization:
  - logo
  - Animation:
    - modal
    - CtmBtn 1&2
*/
