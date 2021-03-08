import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator, SettingsStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen name="Main" component={MainStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
