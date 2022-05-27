import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";

interface AgeInputProps {
  yearOfBirth: string;
  setYearOfBirth: (text: string) => {};
  setInputFocus?: (text: string) => void;
}

class AgeInput extends Component<AgeInputProps> {
  render() {
    return (
      <Animatable.View
        style={GlobalStyles.whiteContainer}
        animation="fadeInUp"
        duration={700}
      >
        <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
        <TextInput
          value={this.props.yearOfBirth}
          maxLength={4}
          keyboardType="number-pad"
          placeholder="2022"
          style={GlobalStyles.textInput}
          onChangeText={(text) => {
            this.props.setYearOfBirth(text);
            this.props?.setInputFocus ? this.props.setInputFocus(text) : null;
          }}
        />
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    yearOfBirth: state.yearOfBirth,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    setYearOfBirth: (text: string) =>
      dispatch({ type: "SET_YEAR_OF_BIRTH", payload: text }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AgeInput);
