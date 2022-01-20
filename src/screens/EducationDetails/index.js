import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import { localData } from "../../assets/data/GlobalData";

const EducationDetailsScreen = ({ route, navigation }) => {
  const { postStudiekode: subjectId } = route.params;
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const thisEd = karakterGrenser.find(
    (karakterGrenser) => karakterGrenser.studiekode === subjectId
  );
  const [edAlreadyAdded, setEdAlreadyAdded] = useState(
    localData.wantedEducations.studiekode.includes(thisEd.studiekode)
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
      </View>
      {edAlreadyAdded ? null : (
        <TouchableOpacity
          onPress={() => {
            localData.wantedEducations.studiekode.push(thisEd.studiekode);
            setEdAlreadyAdded(true);
            if (localData.firstTime.logIn) {
              localData.firstTime.logIn = false;
              navigation.navigate("RecommendStack");
            }
          }}
          style={GlobalStyles.customBtnContainer}
        >
          <CustomBtn text="Legg til utdanning" />
        </TouchableOpacity>
      )}
      {edAlreadyAdded ? (
        <TouchableOpacity
          style={GlobalStyles.customBtnContainer}
          onPress={() => {
            localData.wantedEducations.studiekode =
              localData.wantedEducations.studiekode.filter(function (
                value,
                index,
                arr
              ) {
                return value != thisEd.studiekode;
              });
            setEdAlreadyAdded(false);
          }}
        >
          <View
            style={[
              GlobalStyles.addBtn,
              { flexDirection: "row", borderColor: "red" },
            ]}
          >
            <Icon name="remove" size={25} color="red" />
            <Text style={{ color: "red" }}> Fjern utdanning</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
});

export default EducationDetailsScreen;

// (
//   <TouchableOpacity
//     style={GlobalStyles.customBtnContainer}
//     onPress={() => navigation.goBack()}
//   >
//     <Animatable.View
//       animation="jello"
//       style={[GlobalStyles.addBtn, { flexDirection: "row" }]}
//     >
//       <Icon name="check" size={25} color={GlobalStyles.blueColor.color} />
//       <Text style={{ color: GlobalStyles.blueColor.color }}>
//         {" "}
//         Tilbake
//       </Text>
//     </Animatable.View>
//   </TouchableOpacity>
// )
