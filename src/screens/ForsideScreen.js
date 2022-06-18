import React from "react";
import { View, ImageBackground } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import ArrowBtn from "../components/ArrowBtn";
import CustomBtn from "../components/CustomBtn";
import { connect } from "react-redux";

const ForsideScreen = (props) => {
  return (
    <View style={GlobalStyles.container}>
      <ImageBackground
        source={require("../../assets/images/forside.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <CustomBtn
          text="<RESET>"
          onclick={() => props.resetAllStates()}
          height="30%"
        />
        <ArrowBtn
          onclick={() => {
            props.navigation.navigate("NewProfile");
          }}
        />
      </ImageBackground>
    </View>
  );
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    resetAllStates: () => dispatch({ type: "RESET_ALL_STATES", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ForsideScreen);
