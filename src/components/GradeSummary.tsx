import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { connect } from "react-redux";
import { IExtraPoints } from "../assets/data/Interfaces";
import { useIsFocused } from "@react-navigation/native";
import List from "./List";

const ALDERSPOENG = "Alderspoeng";
const TILLEGGSPOENG = "Tilleggspoeng";
const REAL_OG_SPRÅKPOENG = "Real- og språkpoeng";
const KARAKTERSNITT = "Karaktersnitt";

interface GradeSummaryProps {
  totalPoints: number;
  alderspoeng: number;
  extraPoints: IExtraPoints;
  realfagspoeng: number;
  snitt: number;
  updateAlderspoeng: () => void;
  updateTotalPoints: () => void;
  updateRealfagspoeng: () => void;
}

const GradeSummary: React.FC<GradeSummaryProps> = (props) => {
  const [summaryList, setSummaryList] = useState([{ name: "", value: 0 }]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      props.updateAlderspoeng();
      props.updateRealfagspoeng();
      props.updateTotalPoints();
      setSummaryList(updateSummaryList());
    }
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      setSummaryList(updateSummaryList());
    }
  }, [props.alderspoeng, props.extraPoints.value, props.realfagspoeng]);
  function updateSummaryList() {
    return [
      { name: ALDERSPOENG, value: props.alderspoeng },
      { name: TILLEGGSPOENG, value: props.extraPoints.value },
      { name: REAL_OG_SPRÅKPOENG, value: props.realfagspoeng },
      { name: KARAKTERSNITT, value: props.snitt },
    ];
  }

  return (
    <View style={GlobalStyles.whiteContainer}>
      <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
        Dine poeng
      </Text>
      <Text style={styles.poeng}>{props.totalPoints}</Text>
      <View style={GlobalStyles.greyContainer}>
        <List
          data={summaryList}
          keyExtractor={(e: any) => e.name}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item, index }) => (
            <View>
              <View style={GlobalStyles.row}>
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                <View style={GlobalStyles.listEndContainer}>
                  <Text style={GlobalStyles.listText}>{item.value}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poeng: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.blueColor.color,
  },
});

function mapStateToProps(state: any) {
  return {
    totalPoints: state.totalPoints,
    alderspoeng: state.alderspoeng,
    extraPoints: state.extraPoints,
    realfagspoeng: state.realfagspoeng,
    snitt: state.snitt,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    updateAlderspoeng: () =>
      dispatch({ type: "UPDATE_ALDERSPOENG", payload: null }),
    updateTotalPoints: () =>
      dispatch({ type: "UPDATE_TOTAL_POINTS", payload: null }),
    updateRealfagspoeng: () =>
      dispatch({ type: "UPDATE_REALFAGSPOENG", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GradeSummary);
