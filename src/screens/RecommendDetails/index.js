import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const RecommendDetailsScreen = ({ route, navigation }) => {
  const { postStudiekode: subjectId } = route.params;
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const thisEd = karakterGrenser.find(
    (karakterGrenser) => karakterGrenser.studiekode === subjectId
  );
  const educationData = [
    { name: "Studiekode", value: thisEd.studiekode },
    { name: "Lærerstedskode", value: thisEd.lærerstedskode },
    { name: "Studiested", value: thisEd.studiested },
    { name: "Felt", value: thisEd.felt },
    { name: "Opptakskrav", value: thisEd.opptakskrav },
    { name: "Poenggrense", value: thisEd.poenggrense },
    { name: "Poenggrense_f", value: thisEd.poenggrense_f },
    { name: "Antall venteliste", value: thisEd.antall_venteliste },
  ];
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.whiteContainer2}>
        <Text style={styles.title}>{thisEd.studienavn}</Text>
        <View style={GlobalStyles.greyContainer}>
          <FlatList
            data={educationData}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => (
              <View style={GlobalStyles.ItemSeparatorComponent} />
            )}
            renderItem={({ item }) => (
              <View style={GlobalStyles.row}>
                <Text style={[GlobalStyles.listText, { fontWeight: "bold" }]}>
                  {item.name == "Poenggrense"
                    ? "Ordinær poenggrense"
                    : item.name == "Poenggrense_f"
                    ? "Primær poenggrense"
                    : item.name}
                </Text>
                <View style={GlobalStyles.listEndContainer}>
                  <Text style={GlobalStyles.listText}>{item.value}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <Text>SLIK ØKER DU SNITTET: DU KANKE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
});

export default RecommendDetailsScreen;
