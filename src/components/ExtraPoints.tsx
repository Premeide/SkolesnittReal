import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { IExtraPoints } from "../assets/data/Interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";

const INGEN_AV_DISSE = "Ingen av disse";
let extraPointsAlternatives = [
  { name: "Folkehøyskole" },
  { name: "Militæret" },
  { name: "30 til 59 studiepoeng" },
  { name: "60 studiepoeng" },
  { name: INGEN_AV_DISSE },
];
interface ExtraPointsProps {
  extraPoints: IExtraPoints;
  setExtraPoints: (text: string) => {};
}

class ExtraPoints extends Component<ExtraPointsProps> {
  state = {
    checkArray: [""],
  };
  changeCheckArray = (text: string) => {
    let newCheckArray = this.state.checkArray;
    if (this.state.checkArray.includes(text)) {
      newCheckArray = newCheckArray.filter((e: string) => e !== text);
    } else if (text == INGEN_AV_DISSE) {
      newCheckArray = [INGEN_AV_DISSE];
    } else {
      newCheckArray.push(text);
    }
    this.setState({ checkArray: newCheckArray });
  };
  render() {
    return (
      <Animatable.View
        style={GlobalStyles.whiteContainer}
        animation="fadeInUp"
        duration={700}
      >
        <Text style={GlobalStyles.underTitleText}>
          Tilleggspoeng: {this.props.extraPoints.value}
        </Text>
        <View style={GlobalStyles.greyContainer}>
          <FlatList
            data={extraPointsAlternatives}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => (
              <View style={GlobalStyles.ItemSeparatorComponent} />
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={GlobalStyles.row}
                onPress={() => {
                  this.props.setExtraPoints(item.name);
                  this.changeCheckArray(item.name);
                }}
              >
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                {item.name == INGEN_AV_DISSE ? null : (
                  <View style={GlobalStyles.listEndContainer}>
                    {this.state.checkArray.includes(item.name) ? (
                      <FontAwesome5
                        name={"check-circle"}
                        size={25}
                        color="black"
                      />
                    ) : (
                      <FontAwesome5 name={"circle"} size={25} color="black" />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    extraPoints: state.extraPoints,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    setExtraPoints: (text: string) =>
      dispatch({ type: "SET_EXTRA_POINTS", payload: text }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExtraPoints);
