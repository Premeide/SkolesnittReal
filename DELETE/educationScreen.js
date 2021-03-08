import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EducationScreen = ({ route, navigation }) => {
  const subjectId = route.params.postStudiekode;

  const karakterGrenser = require("../components/karaktergrense.json");
  const thisEducation = karakterGrenser.find(
    (karakterGrenser) => karakterGrenser.studiekode === subjectId
  );
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>studiekode":{thisEducation.studiekode}, </Text>
      <Text style={styles.txt}>studienavn":{thisEducation.studienavn} </Text>
      <Text style={styles.txt}>
        lærerstedskode":{thisEducation.lærerstedskode}",{" "}
      </Text>
      <Text style={styles.txt}>studiested":{thisEducation.studiested}", </Text>
      <Text style={styles.txt}>felt":{thisEducation.felt}, </Text>
      <Text style={styles.txt}>
        opptakskrav":{thisEducation.opptakskrav}",{" "}
      </Text>
      <Text style={styles.txt}>poenggrense":{thisEducation.poenggrense}, </Text>
      <Text style={styles.txt}>
        antall_venteliste":{thisEducation.antall_venteliste},{" "}
      </Text>
      <Text style={styles.txt}>
        poenggrense_f":{thisEducation.poenggrense_f},{" "}
      </Text>
      <Text style={styles.txt}>
        venteliste_f":{thisEducation.venteliste_f}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default EducationScreen;
