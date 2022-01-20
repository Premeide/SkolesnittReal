import React from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import ArrowButton from "../../components/ArrowButton";
import { localData, defaultLocalData } from "../../assets/data/GlobalData";

const ForsideScreen = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <ImageBackground
        source={require("../../assets/images/forside.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ width: "30%", top: 70, position: "absolute" }}
          onPress={() => {
            localData.firstTime.logIn = true;
            localData.firstTime.Kalk = true;
            localData.firstTime.home = true;
          }}
        >
          <Text>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewProfile");
          }}
          style={GlobalStyles.customBtnContainer}
        >
          <ArrowButton />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ForsideScreen;
