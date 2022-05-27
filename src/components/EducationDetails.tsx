import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { IEducation } from "../assets/data/Interfaces";

interface EducationDetailsProps {
  education: IEducation;
}

// const educationData = [
//     { name: "Studiekode", value: thisEd.studiekode },
//     { name: "Lærerstedskode", value: thisEd.lærerstedskode },
//     { name: "Studiested", value: thisEd.studiested },
//     { name: "Felt", value: thisEd.felt },
//     { name: "Opptakskrav", value: thisEd.opptakskrav },
//     { name: "Poenggrense", value: thisEd.poenggrense },
//     { name: "Poenggrense_f", value: thisEd.poenggrense_f },
//     { name: "Antall venteliste", value: thisEd.antall_venteliste },
//   ];
class EducationDetails extends Component<EducationDetailsProps> {
  state = {
    educationData: [
      { name: "Primær poenggrense", value: this.props.education.poenggrense_f },
      { name: "Ordinær poenggrense", value: this.props.education.poenggrense },
      { name: "Lærerstedskode", value: this.props.education.lærerstedskode },
      { name: "Studiested", value: this.props.education.studiested },
      { name: "Opptakskrav", value: this.props.education.opptakskrav },
      {
        name: "Antall venteliste",
        value: this.props.education.antall_venteliste,
      },
      { name: "Felt", value: this.props.education.felt },
      { name: "Studiekode", value: this.props.education.studiekode },
    ],
  };

  render() {
    return (
      <View style={GlobalStyles.whiteContainer}>
        <Text style={styles.title}>{this.props.education.studienavn}</Text>
        <View style={GlobalStyles.greyContainer}>
          <FlatList
            data={this.state.educationData}
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
    );
  }
}
const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold" },
});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {
    // setYearOfBirth: (text: string) =>
    //   dispatch({ type: "SET_YEAR_OF_BIRTH", payload: text }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails);

//<View style={GlobalStyles.whiteContainer2}>
//
//   <View style={GlobalStyles.greyContainer}>
//     <FlatList
//       data={educationData}
//       keyExtractor={(item) => item.name}
//       ItemSeparatorComponent={() => (
//         <View style={GlobalStyles.ItemSeparatorComponent} />
//       )}
//       renderItem={({ item }) => (
//         <View style={GlobalStyles.row}>
//           <Text style={[GlobalStyles.listText, { fontWeight: "bold" }]}>
//             {item.name == "Poenggrense"
//               ? "Ordinær poenggrense"
//               : item.name == "Poenggrense_f"
//               ? "Primær poenggrense"
//               : item.name}
//           </Text>
//           <View style={GlobalStyles.listEndContainer}>
//             <Text style={GlobalStyles.listText}>{item.value}</Text>
//           </View>
//         </View>
//       )}
//     />
//   </View>
// </View>

// {edAlreadyAdded ? null : (
//   <TouchableOpacity
//     onPress={() => {
//       localData.wantedEducations.studiekode.push(thisEd.studiekode);
//       setEdAlreadyAdded(true);
//       if (localData.firstTime.logIn) {
//         localData.firstTime.logIn = false;
//         navigation.navigate("RecommendStack");
//       }
//     }}
//     style={GlobalStyles.customBtnContainer}
//   >
//     <CustomBtn text="Legg til utdanning" />
//   </TouchableOpacity>
// )}

//   {edAlreadyAdded ? (
//     <TouchableOpacity
//       style={GlobalStyles.customBtnContainer}
//       onPress={() => {
//         localData.wantedEducations.studiekode =
//           localData.wantedEducations.studiekode.filter(function (
//             value,
//             index,
//             arr
//           ) {
//             return value != thisEd.studiekode;
//           });
//         setEdAlreadyAdded(false);
//       }}
//     >
//       <View
//         style={[
//           GlobalStyles.addBtn,
//           { flexDirection: "row", borderColor: "red" },
//         ]}
//       >
//         <FontAwesome5 name="remove" size={25} color="red" />
//         <Text style={{ color: "red" }}> Fjern utdanning</Text>
//       </View>
//     </TouchableOpacity>
//   ) : null}
