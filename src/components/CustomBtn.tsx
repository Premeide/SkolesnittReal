import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import * as Animatable from "react-native-animatable";

interface ICustomBtn {
  text: string;
  onclick: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  height?: string | number;
  flexEndBtn?: {
    text: string;
    color?: string;
    onPress?: () => void;
  };
}
class CustomBtn extends Component<ICustomBtn> {
  state = {
    bottom: this.props?.height
      ? this.props.height
      : GlobalStyles.customBtnContainer.bottom,
  };
  render() {
    return (
      <Animatable.View
        style={[
          GlobalStyles.customBtnContainer,
          {
            bottom: this.state.bottom,
            backgroundColor: "green",
          },
        ]}
        animation="slideInUp"
      >
        <TouchableOpacity
          onPress={this.props.onclick}
          style={[styles.container, this.props.style]}
        >
          {this.props.flexEndBtn ? <View style={{ flex: 1 }} /> : null}

          <Text style={[styles.text, this.props.textStyle]}>
            {this.props.text}
          </Text>
          {this.props.flexEndBtn ? (
            <View
              style={{
                alignItems: "flex-end",
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "grey",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                }}
                onPress={this.props?.flexEndBtn?.onPress}
              >
                <Text style={[styles.flexEndText, this.props.textStyle]}>
                  {this.props.flexEndBtn.text}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: GlobalStyles.blueColor.color,
    padding: 10,
    width: "85%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  text: { fontSize: 15, color: "white", fontWeight: "bold" },
  flexEndText: { fontSize: 15, color: "white" },
});
export default CustomBtn;
