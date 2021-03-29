import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";

const FeedbackScreen = (props) => {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Emne:</Text>
        <TextInput
          placeholder="Teknisk feil, forslag"
          style={GlobalStyles.textInput}
          onChangeText={(text) => {}}
        />
      </View>

      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Beskrivelse:</Text>
        <TextInput
          placeholder="Veldig bra app"
          style={GlobalStyles.textInput}
          onChangeText={(text) => {}}
        />
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={GlobalStyles.customBtnContainer}
      >
        <CustomBtn text="Send" />
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
