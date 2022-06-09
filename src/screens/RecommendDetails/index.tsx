import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IEducation } from "../../assets/data/Interfaces";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import EducationDetails from "../../components/EducationDetails";
import OpptakskravDetails from "../../components/OpptakskravDetails";

const KARAKTERGRENSER = require("../../assets/data/karaktergrense.json");

interface IRecommendDetailsScreen {
  route: any;
  navigation: any;
  studiekode: number;
}
class RecommendDetailsScreen extends Component<IRecommendDetailsScreen> {
  state = {
    education: KARAKTERGRENSER.find(
      (o: IEducation) => o.studiekode === this.props?.route?.params?.studiekode
    ),
  };

  render() {
    return (
      <View style={GlobalStyles.container}>
        <ScrollView>
          <EducationDetails education={this.state.education} />
          <OpptakskravDetails education={this.state.education} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default RecommendDetailsScreen;
