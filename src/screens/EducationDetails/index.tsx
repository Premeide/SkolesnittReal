import React, { Component, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import EducationDetails from "../../components/EducationDetails";
import { IEducation } from "../../assets/data/Interfaces";

interface IEducationDetailsScreen {
  route: any;
  navigation: any;
  tutorial: boolean;
  studiekode: number;
  educations: number[];
  setEducations: (studiekode: number) => {};
  tutorialDone: () => {};
}
const KARAKTERGRENSER = require("../../assets/data/karaktergrense.json");

class EducationDetailsScreen extends Component<IEducationDetailsScreen> {
  state = {
    education: KARAKTERGRENSER.find(
      (o: IEducation) => o.studiekode === this.props.route.params.studiekode
    ),
    isAdded: this.props.educations.includes(this.props.route.params.studiekode),
  };

  onClickAddEducation() {
    this.props.setEducations(this.state.education.studiekode);
    this.setState({ isAdded: true });
    if (this.props.tutorial) {
      this.props.tutorialDone();
      this.props.navigation.navigate("RecommendStack");
    }
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <EducationDetails education={this.state.education} />
        {this.state.isAdded ? (
          <CustomBtn
            text="Fjern utdanning"
            onclick={() => {
              this.props.setEducations(this.state.education.studiekode);
              this.setState({ isAdded: false });
            }}
            style={{ backgroundColor: "white", borderColor: "red" }}
            textStyle={{ color: "red" }}
          />
        ) : (
          <CustomBtn
            text="Legg til utdanning"
            onclick={() => this.onClickAddEducation()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    educations: state.educations,
    tutorial: state.tutorial,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    setEducations: (studiekode: number) =>
      dispatch({ type: "SET_EDUCATIONS", payload: studiekode }),
    tutorialDone: () => dispatch({ type: "TUTORIAL_DONE", payload: null }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationDetailsScreen);

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