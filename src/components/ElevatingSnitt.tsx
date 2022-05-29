import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";

interface ElevatingSnittProps {
  snitt: number;
}

class ElevatingSnitt extends Component<ElevatingSnittProps> {
  render() {
    return (
      <View style={styles.karakterElevationContainer}>
        <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
          Karaktersnitt:
        </Text>
        <Text style={styles.poeng}>{this.props.snitt}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  poeng: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.blueColor.color,
  },
  karakterElevationContainer: {
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#52006A",
    borderRadius: 20,
    width: "94%",
    top: "6%",
    right: "3%",
    position: "absolute",
    zIndex: 100,
  },
});

function mapStateToProps(state: any) {
  return {
    snitt: state.snitt,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    // setYearOfBirth: (text: string) =>
    //   dispatch({ type: "SET_YEAR_OF_BIRTH", payload: text }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ElevatingSnitt);
