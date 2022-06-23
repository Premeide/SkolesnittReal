import React, { Component } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { IState } from "../assets/data/Interfaces";

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
        animation="fadeIn"
        duration={500}
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

function mapStateToProps(state: IState) {
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
