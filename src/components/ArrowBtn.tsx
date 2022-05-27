import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";

interface ArrowBtnProps {
  onclick: () => void;
}

class ArrowBtn extends Component<ArrowBtnProps> {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onclick}
        style={GlobalStyles.customBtnContainer}
      >
        <Animatable.View animation="slideInRight" style={styles.container}>
          <FontAwesome5 name="arrow-right" size={25} color="white" />
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: GlobalStyles.blueColor.color,
    padding: 15,
    width: "30%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ArrowBtn);
