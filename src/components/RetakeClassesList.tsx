import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GlobalStyles from "../assets/styles/GlobalStyles";
import { connect } from "react-redux";
import { IGrade } from "../assets/data/Interfaces";
import List from "./List";

interface RetakeClassesListProps {
  navigation: any;
  retakeGrades: IGrade[];
  grades: IGrade[];
}

const RetakeClassesList: React.FC<RetakeClassesListProps> = ({
  retakeGrades,
  grades,
  navigation,
}) => {
  function oldGradeFinder(newName: string) {
    for (const [i, e] of grades.entries()) {
      if (e.id == newName) {
        return (e.value + 1).toString() + " til";
      }
    }
    return "Ny";
  }
  return (
    <View style={GlobalStyles.whiteContainer}>
      <Text
        style={GlobalStyles.underTitleText}
        onPress={() => navigation.navigate("RetakeKalkulator")}
      >
        Disse fagene skal jeg ta opp:
      </Text>
      <View style={GlobalStyles.greyContainer}>
        <List
          data={retakeGrades}
          keyExtractor={(o) => o.id}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={GlobalStyles.row}
              onPress={() => navigation.navigate("RetakeKalkulator")}
            >
              <Text style={[GlobalStyles.listText, { width: "82%" }]}>
                {item.id}
              </Text>
              <View style={GlobalStyles.listEndContainer}>
                <Text style={GlobalStyles.listText}>
                  {oldGradeFinder(item.id)} {item.value + 1}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("RetakeKalkulator")}
        >
          <Text style={GlobalStyles.listText}>Trykk for å legge til fag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    retakeGrades: state.retakeGrades,
    grades: state.grades,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    // updateSnitt: () => dispatch({ type: "UPDATE_SNITT", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RetakeClassesList);
