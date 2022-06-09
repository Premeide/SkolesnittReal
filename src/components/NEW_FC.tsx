import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

interface NEW_FCProps {}

const NEW_FC: React.FC<NEW_FCProps> = (props) => {
  return (
    <View>
      <Text>FUNCTIONAL COMPONENT</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(NEW_FC);
