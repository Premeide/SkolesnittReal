import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { IEducation, IState, IOpptaksKrav } from "../assets/data/Interfaces";

interface OpptakskravDetailsProps {
  education: IEducation;
  totalPoints: number;
  retakeTotalPoints: number;
}

const OpptakskravDetails: React.FC<OpptakskravDetailsProps> = (props) => {
  const snittEqualsRetakeSnitt =
    props.totalPoints === props.retakeTotalPoints ? true : false;
  const ALL_OPPTAKSKRAV = require("../assets/data/opptakskrav.json");
  const opptakskrav: IOpptaksKrav = ALL_OPPTAKSKRAV.find(
    (item: IOpptaksKrav) => item.opptakskrav == props?.education?.opptakskrav
  );
  function toNumber(s: string) {
    try {
      let n = Number(s[0] + s[1] + s[3]) / 10;
      // console.log("n:", n);
      return n;
    } catch (error) {
      return 1000;
    }
  }
  return (
    <View style={GlobalStyles.whiteContainer}>
      <Text style={GlobalStyles.addText}>{opptakskrav.opptakskrav}:</Text>

      <Text style={GlobalStyles.listText}>{opptakskrav.description}</Text>

      <Text style={GlobalStyles.addText}>
        Ordinær poenggrense:{" "}
        {props.totalPoints >= toNumber(props.education.poenggrense) ? (
          <FontAwesome5 name={"check-circle"} size={20} color="green" />
        ) : (
          <FontAwesome5 name={"times-circle"} size={20} color="red" />
        )}
      </Text>
      {props.totalPoints >= toNumber(props.education.poenggrense) ? (
        <Text style={GlobalStyles.listText}>
          Du har{" "}
          {Math.round(
            (props.totalPoints - toNumber(props.education.poenggrense)) * 100
          ) / 100}{" "}
          poeng mer enn den ordinære poenggrensen i 2021
        </Text>
      ) : (
        <Text style={GlobalStyles.listText}>
          Du har{" "}
          {Math.round(
            (toNumber(props.education.poenggrense) - props.totalPoints) * 100
          ) / 100}{" "}
          poeng under enn den ordinære poenggrensen i 2021
        </Text>
      )}

      {snittEqualsRetakeSnitt == false ? (
        <View>
          <Text style={GlobalStyles.addText}>
            Poenggrense med nye fag:{" "}
            {props.retakeTotalPoints >=
            toNumber(props.education.poenggrense) ? (
              <FontAwesome5 name={"check-circle"} size={20} color="green" />
            ) : (
              <FontAwesome5 name={"times-circle"} size={20} color="red" />
            )}
          </Text>
          {props.retakeTotalPoints >= toNumber(props.education.poenggrense) ? (
            <Text style={GlobalStyles.listText}>
              Med nye fag har du{" "}
              <Text style={{ fontWeight: "bold" }}>
                {Math.round(
                  (props.retakeTotalPoints -
                    toNumber(props.education.poenggrense)) *
                    100
                ) / 100}{" "}
              </Text>
              poeng mer enn den ordinære poenggrensen i 2021
            </Text>
          ) : (
            <Text style={GlobalStyles.listText}>
              Med nye fag er du{" "}
              <Text style={{ fontWeight: "bold" }}>
                {Math.round(
                  (toNumber(props.education.poenggrense) -
                    props.retakeTotalPoints) *
                    100
                ) / 100}{" "}
              </Text>
              poeng under enn den ordinære poenggrensen i 2021
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

function mapStateToProps(state: IState) {
  return {
    totalPoints: state.totalPoints,
    retakeTotalPoints: state.retakeTotalPoints,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(OpptakskravDetails);
