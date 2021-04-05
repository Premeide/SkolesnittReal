import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const faqData = [
  {
    title: "Hva er Realfagspoeng?",
    text: "Du kan få inntil 4 språk- og realfagspoeng til sammen. ",
  },
  {
    title: "",
    text:
      "Du kan få språkpoeng for fremmedspråk tatt som programfag. Du kan få inntil 4 språk- og realfagspoeng til sammen. Det er ikke mulig å få mer enn 1,5 språkpoeng for samme språk.",
  },
  { title: "", text: "" },
  { title: "", text: "" },
  { title: "", text: "" },
  { title: "", text: "" },
];
const QuestionsScreen = (props) => {
  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>ok</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default QuestionsScreen;
