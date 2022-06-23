import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import GlobalStyles from "../assets/styles/GlobalStyles";
import List from "./List";

let LISTDATA = [
  { name: "Vanlige spørsmål", screen: "Questions" },
  { name: "Kontakt oss", screen: "Feedback" },
  { name: "Om", screen: "About" },
];

interface ProfileListProps {
  navigation: any;
  resetAllStates: () => {};
}

class ProfileList extends Component<ProfileListProps> {
  state = {};

  render() {
    return (
      <View style={GlobalStyles.whiteContainer}>
        <List
          data={LISTDATA}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={GlobalStyles.row}
              onPress={() => this.props.navigation.navigate(item.screen)}
            >
              <Text style={GlobalStyles.listText}>{item.name}</Text>
              <View style={GlobalStyles.listEndContainer}>
                <FontAwesome5 name="arrow-right" size={30} color="black" />
              </View>
            </TouchableOpacity>
          )}
        />
        <Text
          style={[GlobalStyles.listText, { color: "red" }]}
          onPress={() => {
            Alert.alert(
              "Logg ut?",
              "Vil du lage ny profil? (denne profilen blir slettet)",
              [
                {
                  text: "Ja, lag ny",
                  onPress: () => {
                    this.props.resetAllStates();
                    this.props.navigation.navigate("NewProfile");
                  },
                },
                { text: "Avbryt" },
              ]
            );
          }}
        >
          Logg ut
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {
    resetAllStates: () => dispatch({ type: "RESET_ALL_STATES", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
