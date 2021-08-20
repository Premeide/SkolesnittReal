import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import { localData } from "../../assets/data/GlobalData";
import * as Animatable from "react-native-animatable";

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
                  {item.name}
                </Text>
                <View style={GlobalStyles.listEndContainer}>
                  <Text style={GlobalStyles.listText}>{item.value}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      {edAlreadyAdded ? (
        <TouchableOpacity
          style={GlobalStyles.customBtnContainer}
          onPress={() => navigation.goBack()}
        >
          <Animatable.View
            animation="jello"
            style={[GlobalStyles.addBtn, { flexDirection: "row" }]}
          >
            <Icon name="check" size={25} color={GlobalStyles.blueColor.color} />
            <Text style={{ color: GlobalStyles.blueColor.color }}>
              {" "}
              Tilbake
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            localData.wantedEducations.studiekode.push(thisEd.studiekode);
            setEdAlreadyAdded(true);
          }}
          style={GlobalStyles.customBtnContainer}
        >
          <CustomBtn text="Legg til utdanning" />
        </TouchableOpacity>
      )}
      {edAlreadyAdded ? (
        <TouchableOpacity
          style={[
            GlobalStyles.customBtnContainer,
            { bottom: GlobalStyles.customBtn2Bottom.bottom },
          ]}
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

export default EducationDetailsScreen;
