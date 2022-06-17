import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { connect } from "react-redux";
import GlobalStyles from "../assets/styles/GlobalStyles";

import BottomTabNavigator from "./BottomTabNavigator";

import KalkulatorScreen from "../screens/Kalkulator";
import NewProfileScreen from "../screens/NewProfile";
import AboutScreen from "../screens/About";
import DiscoverScreen from "../screens/Discover";
import ProfileScreen from "../screens/Profile";
import RetakeKalkulatorScreen from "../screens/RetakeKalkulator";
import QuestionsScreen from "../screens/Questions";
import FeedbackScreen from "../screens/Feedback";
import EducationDetailsScreen from "../screens/EducationDetails";
import RecommendDetailsScreen from "../screens/RecommendDetails";
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

const Router = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {props.tutorial ? (
        <Stack.Screen
          name="NewProfile"
          component={NewProfileScreen}
          options={{
            headerTitle: "Ny profil",
            headerTitleAlign: "center",
            headerTitleStyle: { color: GlobalStyles.blueColor.color },
          }}
        />
      ) : null}

      <Stack.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="_Hjem"
        component={HomeScreen}
        options={{
          // headerTitle: "Ny profil",
          // headerTitleAlign: "center",
          // headerTitleStyle: { color: GlobalStyles.blueColor.color },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="_Kalkulator"
        component={KalkulatorScreen}
        options={{
          headerTitle: "Legg til fagene dine",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
          headerShown: false,
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
        name="_RecommendDetails"
        component={RecommendDetailsScreen}
        options={{
          headerTitle: "Øk snittet",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
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
        name="_NewProfile"
        component={NewProfileScreen}
        options={{
          headerTitle: "Ny profil",
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
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: "Om",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />

      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerTitle: "Kontakt oss",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
      {/* <Stack.Screen
        name="_Forside"
        component={ForsideScreen}
        options={{
          headerTitle: "FORSIDE as",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    tutorial: state.tutorial,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Router);
