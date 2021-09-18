import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalStyles from "../assets/styles/GlobalStyles";

import RecommendScreen from "../screens/Recommend";
import RecommendDetailsScreen from "../screens/RecommendDetails";

const Stack = createStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recommend"
        component={RecommendScreen}
        options={{ headerTitle: "Hvordan øke snittet", headerShown: false }}
      />
      <Stack.Screen
        name="RecommendDetails"
        component={RecommendDetailsScreen}
        options={{
          headerTitle: "Øk snittet",
          headerTitleAlign: "center",
          headerTitleStyle: { color: GlobalStyles.blueColor.color },
        }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverStack;
