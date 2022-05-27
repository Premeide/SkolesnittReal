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

interface COMPONENT_NAMEProps {}

class COMPONENT_NAME extends Component<COMPONENT_NAMEProps> {
  state = {};

  render() {
    return (
      <View>
        <Text>ABC</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {
    // setYearOfBirth: (text: string) =>
    //   dispatch({ type: "SET_YEAR_OF_BIRTH", payload: text }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(COMPONENT_NAME);
