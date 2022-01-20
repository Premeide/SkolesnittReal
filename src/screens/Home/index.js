import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  allClasseslist,
  localData,
  basisClasses,
} from "../../assets/data/GlobalData";
import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import SegmentedControl from "rn-segmented-control";
import { useIsFocused } from "@react-navigation/native";
import CustomBtn from "../../components/CustomBtn";
import * as Animatable from "react-native-animatable";

const YEAR_WITH_NO_ALDERSPOENG = 2003; // År 2021: 2002, 2022:2003
const DATA1 = [
  { name: "Alderspoeng", value: 50 },
  { name: "Tilleggspoeng", value: 300 },
  { name: "Real- og språkpoeng", value: 30 },
  { name: "Karaktersnitt", value: 2000 },
];

const HomeScreen = ({ navigation }) => {
  const [activeSegment, setActiveSegment] = useState(0);
  const [mainPoeng, setMainPoeng] = useState(2000);
  const [data1, setData1] = useState(DATA1);

  const isFocused = useIsFocused(); //useeffect emptyarrray gjør jobben kansj

  useEffect(() => {
    if (isFocused) {
      console.log("HOME: useeffect updatingPoeng");
      updatePoeng(activeSegment);
    }
  }, [isFocused]);
  function realogspråkpoeng() {
    let sum = 0;
    let _grades = localData.grades;
    for (const [i, e] of _grades.entries()) {
      for (const [idx, ele] of allClasseslist.entries()) {
        if (e.id == ele.name) {
          sum += ele.rPoints;
        }
      }
    }
    return Math.min(4, sum);
  }
  function alderspoeng(segIndex) {
    let fødselsår = localData.yearOfBirth;
    let _alderspoeng =
      ((segIndex == 1
        ? YEAR_WITH_NO_ALDERSPOENG - 4
        : YEAR_WITH_NO_ALDERSPOENG) -
        fødselsår) *
      2;
    _alderspoeng = Math.min(Math.max(_alderspoeng, 0), 8);
    return _alderspoeng;
  }
  const updatePoeng = (segIndex) => {
    let _grades = localData.grades;
    let sum = 0;
    let numOfClasses = 0;
    let karakterSnitt = 0;
    let newData1 = 0;
    let newMainPoeng = mainPoeng;

    switch (segIndex) {
      case 0:
        for (const [i, e] of _grades.entries()) {
          sum += e.value + 1;
          numOfClasses += 1;
          if (e.includeExam) {
            sum += e.examValue + 1;
            numOfClasses += 1;
          }
        }
        karakterSnitt = (sum * 10) / numOfClasses;
        break;
      case 1:
        for (const [i, e] of _grades.entries()) {
          for (const [idx, ele] of basisClasses.entries()) {
            if (ele == e.id) {
              sum += e.value + 1;
              numOfClasses += 1;
              if (e.includeExam) {
                sum += e.examValue + 1;
                numOfClasses += 1;
              }
              break;
            }
          }
        }
        karakterSnitt = (sum * 10) / numOfClasses;
        break;
      default:
        null;
    }
    newData1 = [
      { name: "Alderspoeng", value: alderspoeng(segIndex) },
      { name: "Tilleggspoeng", value: localData.extraPoints.value },
      { name: "Real- og språkpoeng", value: realogspråkpoeng() },
      { name: "Karaktersnitt", value: karakterSnitt.toFixed(2) },
    ];
    newMainPoeng =
      karakterSnitt + newData1[0].value + newData1[1].value + newData1[2].value;
    setData1(newData1);
    setMainPoeng(newMainPoeng);
  };
  function alertInformation(name) {
    let text = "";
    switch (name) {
      case "Alderspoeng":
        text += "Fødselsår: " + localData.yearOfBirth;
        text += "\n\n (+2 poeng fra og med året du fyller 20)";
        break;
      case "Tilleggspoeng":
        text = "nice";
        break;
      case "Real- og språkpoeng":
        let tempLst = [];
        let _grades = localData.retakeClasses;
        for (const [i, e] of _grades.entries()) {
          for (const [idx, ele] of allClasseslist.entries()) {
            if (e.id == ele.name && ele.rPoints > 0) {
              tempLst.push(e.id + ": " + ele.rPoints);
            }
          }
        }
        text += "Fag du har som gir poeng:\n\n";
        text += tempLst.join("\n");
        break;
      case "Karaktersnitt":
        text += "niceas";
        break;
      default:
        text = "????";
    }
    return text;
  }
  const handleSegmentedControl = (i) => {
    setActiveSegment(i);
    updatePoeng(i);
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <CustomHeader />
        <View style={GlobalStyles.whiteContainer}>
          <SegmentedControl
            tabs={["Konkurransepoeng", "23/5-poeng"]}
            textStyle={{ fontSize: 10 }}
            currentIndex={activeSegment}
            onChange={(index) => handleSegmentedControl(index)}
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
          <Text style={styles.poeng}>{mainPoeng.toFixed(2)}</Text>
          <View style={GlobalStyles.greyContainer}>
            {data1.map((item, index) => (
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
                {index >= data1.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {localData.firstTime.logIn ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}
          style={[GlobalStyles.customBtnContainer, { position: "relative" }]}
        >
          <Animatable.View
            animation="fadeInUp"
            duration={700}
            delay={1000}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <CustomBtn text="Legg til utdanning" />
          </Animatable.View>
        </TouchableOpacity>
      ) : null}
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

export default HomeScreen;
