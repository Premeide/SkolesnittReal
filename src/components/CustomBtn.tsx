import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import * as Animatable from "react-native-animatable";

interface ICustomBtn {
  text: string;
  onclick: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  height?: string | number;
}
class CustomBtn extends Component<ICustomBtn> {
  state = {
    height: this.props?.height
      ? this.props.height
      : GlobalStyles.customBtnContainer.height,
  };
  render() {
    return (
      <Animatable.View
        style={[
          GlobalStyles.customBtnContainer,
          {
            height: this.state.height,
          },
        ]}
        animation="slideInUp"
      >
        <TouchableOpacity
          onPress={this.props.onclick}
          style={[styles.container, this.props.style]}
        >
          <Text style={[styles.text, this.props.textStyle]}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: GlobalStyles.blueColor.color,
    padding: 10,
    width: "85%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  text: { fontSize: 15, color: "white", fontWeight: "bold" },
});
export default CustomBtn;
