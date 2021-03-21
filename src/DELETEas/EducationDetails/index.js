import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const EducationDetailsScreen = ({ route, navigation }) => {
  const { postStudiekode: subjectId } = route.params;

  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const thisEd = karakterGrenser.find(
    (karakterGrenser) => karakterGrenser.studiekode === subjectId
  );

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>studiekode":{thisEd.studiekode}</Text>
      <Text style={styles.txt}>studienavn":{thisEd.studienavn}</Text>
      <Text style={styles.txt}>lærerstedskode":{thisEd.lærerstedskode}</Text>
      <Text style={styles.txt}>studiested":{thisEd.studiested}</Text>
      <Text style={styles.txt}>felt":{thisEd.felt}, </Text>
      <Text style={styles.txt}>opptakskrav":{thisEd.opptakskrav}</Text>
      <Text style={styles.txt}>poenggrense":{thisEd.poenggrense}</Text>
      <Text style={styles.txt}>
        antall_venteliste":{thisEd.antall_venteliste},
      </Text>
      <Text style={styles.txt}>poenggrense_f":{thisEd.poenggrense_f}, </Text>
      <Text style={styles.txt}>venteliste_f":{thisEd.venteliste_f} </Text>
    </View>
  );
};

export default EducationDetailsScreen;
