import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { IEducation } from "../assets/data/Interfaces";
import { useIsFocused } from "@react-navigation/native";

const KARAKTERGRENSER = require("../assets/data/karaktergrense.json");

interface MyEducationsListProps {
  navigation: any;
  educations: number[];
}

const MyEducationsList: React.FC<MyEducationsListProps> = (props) => {
  const isFocused = useIsFocused();

  function printUtdanninger(s: number) {
    const thisEd = KARAKTERGRENSER.find((e: IEducation) => e.studiekode === s);
    return (
      <TouchableOpacity
        style={GlobalStyles.row}
        onPress={() => props.navigation.navigate("About")}
      >
        <Text style={[GlobalStyles.listText, { width: "70%" }]}>
          {thisEd.studienavn} ({thisEd.lærerstedskode})
        </Text>
        <View style={GlobalStyles.listEndContainer}>
          <Text style={GlobalStyles.listText}>
            {thisEd.poenggrense} ({thisEd.poenggrense_f})
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={GlobalStyles.whiteContainer}>
      <Text style={GlobalStyles.underTitleText}>Mine utdanninger:</Text>
      <View style={GlobalStyles.greyContainer}>
        {props.educations.length >= 1 ? (
          props.educations.map((item, index) => (
            <View key={item}>
              {printUtdanninger(item)}
              {index >= props.educations.length - 1 ? null : (
                <View style={GlobalStyles.ItemSeparatorComponent}></View>
              )}
            </View>
          ))
        ) : (
          <TouchableOpacity onPress={() => props.navigation.navigate("About")}>
            <Text style={GlobalStyles.listText}>
              Trykk for å legge til utdanninger
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    educations: state.educations,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    // updateSnitt: () => dispatch({ type: "UPDATE_SNITT", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyEducationsList);
