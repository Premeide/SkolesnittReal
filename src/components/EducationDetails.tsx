import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { IEducation } from "../assets/data/Interfaces";
import List from "./List";

interface EducationDetailsProps {
  education: IEducation;
}

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
          <List
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
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails);
