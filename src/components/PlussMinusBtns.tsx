import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PlussMinusBtnsProps {
  onPressPlus: () => void;
  onPressMinus: () => void;
}

const PlussMinusBtns: React.FC<PlussMinusBtnsProps> = (props) => {
  return (
    <View style={styles.DoubleBtnContainer}>
      <TouchableOpacity
        style={styles.BtnContainer}
        onPress={props.onPressMinus}
      >
        <FontAwesome5 name={"minus"} size={15} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.BtnContainer} onPress={props.onPressPlus}>
        <FontAwesome5 name={"plus"} size={15} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  DoubleBtnContainer: {
    // backgroundColor: "green",
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  BtnContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 100,
    padding: 3,
  },
});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {
    // updateSnitt: () => dispatch({ type: "UPDATE_SNITT", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PlussMinusBtns);
