import React from "react";
import { View, ImageBackground } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import ArrowBtn from "../../components/ArrowBtn";

const ForsideScreen = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <ImageBackground
        source={require("../../assets/images/forside.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ArrowBtn
          onclick={() => {
            navigation.navigate("NewProfile");
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default ForsideScreen;
