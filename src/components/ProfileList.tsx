import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";
import List from "./List";

let LISTDATA = [
  { name: "Vanlige spørsmål", screen: "Questions" },
  { name: "Kontakt oss", screen: "Feedback" },
  { name: "Om", screen: "About" },
];

interface ProfileListProps {
  navigation: any;
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
              "Bro, du logget aldri inn... men du kan få lage en ny en.",
              [
                {
                  text: "Ja, gjør det",
                  onPress: () => {
                    this.props.navigation.navigate("NewProfile");
                  },
                },
                { text: "sry" },
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
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
