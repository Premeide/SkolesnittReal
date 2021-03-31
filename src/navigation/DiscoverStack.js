import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalStyles from "../assets/styles/GlobalStyles";

import EducationDetailsScreen from "../screens/EducationDetails";
import DiscoverScreen from "../screens/Discover";

const Stack = createStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerTitle: "Se hva du kan studere", headerShown: false }}
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
    </Stack.Navigator>
  );
};

export default DiscoverStack;
