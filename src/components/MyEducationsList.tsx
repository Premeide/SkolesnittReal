import React, { Component } from "react";
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
import { IGrade, IEducation } from "../assets/data/Interfaces";

const KARAKTERGRENSER = require("../assets/data/karaktergrense.json");

interface MyEducationsListProps {
  navigation: any;
  educations: number[];
}

class MyEducationsList extends Component<MyEducationsListProps> {
  state = {};
  printUtdanninger(s: number) {
    const thisEd = KARAKTERGRENSER.find((e: IEducation) => e.studiekode === s);
    return (
      <TouchableOpacity
        style={GlobalStyles.row}
        onPress={() =>
          this.props.navigation.navigate("RecommendDetails", {
            postStudiekode: thisEd.studiekode,
          })
        }
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
  render() {
    return (
      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Mine utdanninger:</Text>
        <View style={GlobalStyles.greyContainer}>
          {this.props.educations.length >= 1 ? (
            this.props.educations.map((item, index) => (
              <View key={item}>
                {this.printUtdanninger(item)}
                {index >= this.props.educations.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))
          ) : (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Utforsk")}
            >
              <Text style={GlobalStyles.listText}>
                Trykk for å legge til utdanninger
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
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
