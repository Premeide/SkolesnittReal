import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/homeScreen";
import MyGradesScreen from "../screens/myGradesScreen";
import LoginScreen from "../screens/loginScreen";
import DiscoverScreen from "../screens/discoverScreen";
import SettingsScreen from "../screens/settingsScreen";
import ProfileScreen from "../screens/profileScreen";
import Overview from "../screens/overview";
import MenuScreen from "../screens/MenuScreen";
import OmScreen from "../screens/omScreen";
import SignupScreen from "../screens/signupScreen";
import FindSubjectsScreen from "../screens/fincSubjectsScreen";
import EducationScreen from "../screens/educationScreen";

// import BottomTabNavigator from "./TabNavigator";
import Icon3 from "react-native-vector-icons/Entypo";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#03A9F4",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Studievelger" component={HomeScreen} />

      <Stack.Screen name="Profile" component={Overview} />
      <Stack.Screen name="Kalkulator" component={MyGradesScreen} />
      <Stack.Screen name="Poeng" component={ProfileScreen} />
      <Stack.Screen name="Education Screen" component={EducationScreen} />
      <Stack.Screen name="Om" component={OmScreen} />
      <Stack.Screen name="Fagområder" component={DiscoverScreen} />
      <Stack.Screen name="Fylke" component={FindSubjectsScreen} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };

// options={{
//   headerRight: () => (
//     <Icon3
//       name="dots-three-vertical"
//       size={20}
//       color="grey"
//       onPress={() => navigation.openDrawer()}
//       color="white"
//       style={{ paddingRight: 10 }}
//     />
//   ),
//   headerTitle: "OVERSIKT",
//   headerTitleAlign: "center",
// }}
