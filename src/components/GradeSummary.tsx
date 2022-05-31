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

  // retakeSnitt: number;
  // retakeRealfagspoeng: number;
  // totalPoints235: number;
}

const GradeSummary: React.FC<GradeSummaryProps> = ({
  totalPoints,
  alderspoeng,
  extraPoints,
  realfagspoeng,
  snitt,
  updateAlderspoeng,
  updateTotalPoints,
  updateRealfagspoeng,
}) => {
  const [summaryList, setSummaryList] = useState([{ name: "", value: 0 }]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      updateAlderspoeng();
      updateRealfagspoeng();
      updateTotalPoints();
      setSummaryList(updateSummaryList());
    }
  }, [isFocused]);
  function updateSummaryList() {
    return [
      { name: ALDERSPOENG, value: alderspoeng },
      { name: TILLEGGSPOENG, value: extraPoints.value },
      { name: REAL_OG_SPRÅKPOENG, value: realfagspoeng },
      { name: KARAKTERSNITT, value: snitt },
    ];
  }

  return (
    <View style={GlobalStyles.whiteContainer}>
      <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
        Dine poeng:
      </Text>
      <Text style={styles.poeng}>{totalPoints}</Text>
      <View style={GlobalStyles.greyContainer}>
        <FlatList
          data={summaryList}
          keyExtractor={(e: any) => e.name}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                Alert.alert(item.name, alertInformation(item.name), [
                  { text: "Ok" },
                ]);
              }}
            >
              <View style={GlobalStyles.row}>
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                <View style={GlobalStyles.listEndContainer}>
                  <Text style={GlobalStyles.listText}>{item.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
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

function alertInformation(name: string) {
  let text = "";
  switch (name) {
    case ALDERSPOENG:
      // text += "Fødselsår: " + localData.yearOfBirth;
      text += "\n\n (+2 poeng fra og med året du fyller 20)";
      break;
    case TILLEGGSPOENG:
      text = "<TILLEGSPOENG INFORMASJON>";
      break;
    case REAL_OG_SPRÅKPOENG:
      text = "<REAL- OG SPRÅLPOENG INFORMASJON>";
      // let tempLst = [];
      // let _grades = localData.retakeClasses;
      // for (const [i, e] of _grades.entries()) {
      //   for (const [idx, ele] of allClasseslist.entries()) {
      //     if (e.id == ele.name && ele.rPoints > 0) {
      //       tempLst.push(e.id + ": " + ele.rPoints);
      //     }
      //   }
      // }
      // text += "Fag du har som gir poeng:\n\n";
      // text += tempLst.join("\n");
      break;
    case "Karaktersnitt":
      text += "<KARAKTERSNITT INFORMASJON>";
      break;
    default:
      text = "<WHAT>";
  }
  return text;
}
// const isFocused = useIsFocused(); //useeffect emptyarrray gjør jobben kansj

// useEffect(() => {
//   if (isFocused) {
//     console.log("HOME: useeffect updatingPoeng");
//     updatePoeng(activeSegment);
//   }
// }, [isFocused]);
// function realogspråkpoeng() {
//   let sum = 0;
//   let _grades = localData.grades;
//   for (const [i, e] of _grades.entries()) {
//     for (const [idx, ele] of allClasseslist.entries()) {
//       if (e.id == ele.name) {
//         sum += ele.rPoints;
//       }
//     }
//   }
//   return Math.min(4, sum);
// }

// const updatePoeng = (segIndex) => {
//   let _grades = localData.grades;
//   let sum = 0;
//   let numOfClasses = 0;
//   let karakterSnitt = 0;
//   let newData1 = 0;
//   let newMainPoeng = mainPoeng;

//   switch (segIndex) {
//     case 0:
//       for (const [i, e] of _grades.entries()) {
//         sum += e.value + 1;
//         numOfClasses += 1;
//         if (e.includeExam) {
//           sum += e.examValue + 1;
//           numOfClasses += 1;
//         }
//       }
//       karakterSnitt = (sum * 10) / numOfClasses;
//       break;
//     case 1:
//       for (const [i, e] of _grades.entries()) {
//         for (const [idx, ele] of basisClasses.entries()) {
//           if (ele == e.id) {
//             sum += e.value + 1;
//             numOfClasses += 1;
//             if (e.includeExam) {
//               sum += e.examValue + 1;
//               numOfClasses += 1;
//             }
//             break;
//           }
//         }
//       }
//       karakterSnitt = (sum * 10) / numOfClasses;
//       break;
//     default:
//       null;
//   }
//   newData1 = [
//     { name: "Alderspoeng", value: alderspoeng(segIndex) },
//     { name: "Tilleggspoeng", value: localData.extraPoints.value },
//     { name: "Real- og språkpoeng", value: realogspråkpoeng() },
//     { name: "Karaktersnitt", value: karakterSnitt.toFixed(2) },
//   ];
//   newMainPoeng =
//     karakterSnitt + newData1[0].value + newData1[1].value + newData1[2].value;
//   setData1(newData1);
//   setMainPoeng(newMainPoeng);
// };

// const handleSegmentedControl = (i) => {
//   setActiveSegment(i);
//   updatePoeng(i);
// };
