import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Router from "./src/navigation/Router";
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Router />
    </NavigationContainer>
  );
};
export default App;

{
  /* <DrawerNavigator/> */
}
