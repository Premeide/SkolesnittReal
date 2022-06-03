import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import GlobalStyles from "../assets/styles/GlobalStyles";

interface ElevatingSnittProps {
  snitt: number;
  retakeSnitt: number;
  isRetake?: boolean;
}

class ElevatingSnitt extends Component<ElevatingSnittProps> {
  state = {
    top: this.props?.isRetake ? "1%" : styles.karakterElevationContainer.top,
  };
  render() {
    return (
      <View
        style={[styles.karakterElevationContainer, { top: this.state.top }]}
      >
        <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
          Karaktersnitt:
        </Text>
        <Text style={styles.poeng}>
          {this.props?.isRetake ? this.props.retakeSnitt : this.props.snitt}
        </Text>
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
    retakeSnitt: state.retakeSnitt,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ElevatingSnitt);
