import React from "react";
import { View, Text, ScrollView } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const RecommendDetailsScreen = ({ route, navigation }) => {
  const { postStudiekode: subjectId } = route.params;
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const thisEd = karakterGrenser.find(
    (karakterGrenser) => karakterGrenser.studiekode === subjectId
  );
  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <Text>Du bør ikke studere {thisEd.studienavn}.</Text>
      </ScrollView>
    </View>
  );
};

export default RecommendDetailsScreen;
