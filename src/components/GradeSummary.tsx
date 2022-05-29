import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import SegmentedControl from "rn-segmented-control";
import { IExtraPoints } from "../assets/data/Interfaces";
import { useIsFocused } from "@react-navigation/native";

const YEAR_WITH_NO_ALDERSPOENG = 2003; // År 2021: 2002, 2022:2003

const ALDERSPOENG = "Alderspoeng";
const TILLEGGSPOENG = "Tilleggspoeng";
const REAL_OG_SPRÅKPOENG = "Real- og språkpoeng";
const KARAKTERSNITT = "Karaktersnitt";

interface GradeSummaryProps {
  snitt: number;
  realfagspoeng: number;
  extraPoints: IExtraPoints;

  retakeSnitt: number;
  retakeRealfagspoeng: number;

  yearOfBirth: string;
}

const GradeSummary: React.FC<GradeSummaryProps> = ({
  snitt,
  realfagspoeng,
  extraPoints,
  retakeSnitt,
  retakeRealfagspoeng,
  yearOfBirth,
}) => {
  const [activeSegment, setActiveSegment] = useState(0);
  const [summaryList, setSummaryList] = useState(updateSummaryList());
  const [summaryList235, setSummaryList235] = useState(updateSummaryList235());
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("ISFOCUSING AND UPDATEING");
      setSummaryList(updateSummaryList);
      setSummaryList235(updateSummaryList235);
    }
  }, [isFocused]);
  function updateSummaryList() {
    return [
      {
        name: ALDERSPOENG,
        value: alderspoeng(activeSegment, yearOfBirth, isFocused),
      },
      { name: TILLEGGSPOENG, value: 100 },
      { name: REAL_OG_SPRÅKPOENG, value: 100 },
      { name: KARAKTERSNITT, value: 100 },
    ];
  }
  function updateSummaryList235() {
    return [
      {
        name: ALDERSPOENG,
        value: alderspoeng(activeSegment, yearOfBirth, isFocused),
      },
      { name: TILLEGGSPOENG, value: 1000 },
      { name: REAL_OG_SPRÅKPOENG, value: 2000 },
      { name: KARAKTERSNITT, value: 3000 },
    ];
  }

  return (
    <View style={GlobalStyles.whiteContainer}>
      <SegmentedControl
        tabs={["Konkurransepoeng", "23/5-poeng"]}
        textStyle={{ fontSize: 10 }}
        currentIndex={activeSegment}
        onChange={(i) => setActiveSegment(i)}
        paddingVertical={10}
        segmentedControlBackgroundColor="gainsboro"
        activeSegmentBackgroundColor={GlobalStyles.blueColor.color}
        activeTextColor="white"
        activeTextWeight="bold"
        textColor="black"
      />
      <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
        Dine poeng:
      </Text>
      <Text style={styles.poeng}>{snitt}</Text>
      <View style={GlobalStyles.greyContainer}>
        <FlatList
          data={activeSegment == 0 ? summaryList : summaryList235}
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
    color: "black",
  },
});

function mapStateToProps(state: any) {
  return {
    snitt: state.snitt,
    realfagspoeng: state.realfagspoeng,
    extraPoints: state.extraPoints,

    retakeSnitt: state.retakeSnitt,
    retakeRealfagspoeng: state.retakeRealfagspoeng,

    yearOfBirth: state.yearOfBirth,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(GradeSummary);

function alderspoeng(
  segIndex: number,
  yearOfBirth: string,
  isVisible: boolean
) {
  if (!isVisible) return 0;

  let fødselsår = isPositiveInteger(yearOfBirth) ? Number(yearOfBirth) : 2020;
  let alderspoeng =
    ((segIndex == 1 ? YEAR_WITH_NO_ALDERSPOENG - 4 : YEAR_WITH_NO_ALDERSPOENG) -
      fødselsår) *
    2;
  alderspoeng = Math.min(Math.max(alderspoeng, 0), 8);
  console.log("calculating alderspoeng", alderspoeng);
  return alderspoeng;
}
function isPositiveInteger(str: string) {
  //helper function
  if (typeof str !== "string") {
    return false;
  }
  const num = Number(str);
  if (Number.isInteger(num) && num > 0) {
    return true;
  }
  return false;
}

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
