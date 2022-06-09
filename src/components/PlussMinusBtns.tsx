import React from "react";
import { StyleSheet, View } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
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
    padding: 5,
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
