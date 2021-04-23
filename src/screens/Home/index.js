import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  allClasseslist,
  localData,
  basisClasses,
} from "../../assets/data/GlobalData";
import styles from "./styles";
import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import SegmentedControl from "rn-segmented-control";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [activeSegment, setActiveSegment] = useState(0);
  const [activeSegment2, setActiveSegment2] = useState(0);
  const isFocused = useIsFocused(); //useeffect emptyarrray gjør jobben kansj
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  let [mainPoeng, setMainPoeng] = useState(2000);
  let [retakePoeng, setRetakePoeng] = useState(3000);
  let [data1, setData1] = useState([
    { name: "Alderspoeng", value: 50 },
    { name: "Tilleggspoeng", value: localData.extraPoints.value },
    { name: "Real- og språkpoeng", value: 30 },
    { name: "Karaktersnitt", value: 2000 },
  ]);
  useEffect(() => {
    updatePoeng(activeSegment);
    updatePoeng2(activeSegment2);
  }, [isFocused]);
  function realogspråkpoeng() {
    let sum = 0;
    let _grades = localData.grades.value;
    for (const [i, e] of _grades.entries()) {
      for (const [idx, ele] of allClasseslist.entries()) {
        if (e.id == ele.name) {
          sum += ele.type;
        }
      }
    }
    return Math.min(4, sum);
  }
  function alderspoeng(segIndex) {
    let fødselsår = localData.born.value;
    let _alderspoeng = ((segIndex == 1 ? 1998 : 2002) - fødselsår) * 2;
    _alderspoeng = Math.min(Math.max(_alderspoeng, 0), 8);
    return _alderspoeng;
  }
  const updatePoeng = (segIndex) => {
    let _grades = localData.grades.value;
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
          if (e.exam) {
            sum += e.exva + 1;
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
              if (e.exam) {
                sum += e.exva + 1;
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
  const updatePoeng2 = (segIndex) => {
    let _grades = localData.grades.value;
    let _rgrades = localData.retakeClasses;
    let sum = 0;
    let numOfClasses = 0;
    let karakterSnitt = 0;
    let newData1 = 0;
    let newRetakePoeng = retakePoeng;
    let isRetakingThisClass = false;
    let newRealSpråkPoeng = 0;

    switch (segIndex) {
      case 0:
        for (const [i, e] of allClasseslist.entries()) {
          for (const [idx, ele] of _rgrades.entries()) {
            if (e.name == ele.id) {
              sum += ele.value + 1;
              numOfClasses += 1;
              newRealSpråkPoeng += e.type;
              isRetakingThisClass = true;
              break;
            }
          }
          if (!isRetakingThisClass) {
            for (const [idx, ele] of _grades.entries()) {
              if (e.name == ele.id) {
                sum += ele.value + 1;
                numOfClasses += 1;
                newRealSpråkPoeng += e.type;
                isRetakingThisClass = true;
                if (ele.exam) {
                  sum += ele.exva;
                  numOfClasses += 1;
                }
                break;
              }
            }
          }
          isRetakingThisClass = false;
        }
        karakterSnitt = (sum * 10) / numOfClasses;
        break;
      case 1:
        for (const [i, e] of allClasseslist.entries()) {
          for (const [index, element] of basisClasses.entries()) {
            if (element == e.name) {
              for (const [idx, ele] of _rgrades.entries()) {
                if (e.name == ele.id) {
                  sum += ele.value + 1;
                  numOfClasses += 1;
                  newRealSpråkPoeng += e.type;
                  isRetakingThisClass = true;
                  break;
                }
              }
              if (!isRetakingThisClass) {
                for (const [idx, ele] of _grades.entries()) {
                  if (e.name == ele.id) {
                    sum += ele.value + 1;
                    numOfClasses += 1;
                    newRealSpråkPoeng += e.type;
                    isRetakingThisClass = true;
                    if (ele.exam) {
                      sum += ele.exva;
                      numOfClasses += 1;
                    }
                    break;
                  }
                }
              }
              isRetakingThisClass = false;
              break;
            }
          }
        }
        karakterSnitt = (sum * 10) / numOfClasses;
        break;
      default:
        null;
    }
    newRetakePoeng =
      karakterSnitt +
      localData.extraPoints.value +
      alderspoeng(segIndex) +
      Math.min(4, newRealSpråkPoeng);
    setRetakePoeng(newRetakePoeng);
  };
  const handleSegmentedControl = (i) => {
    setActiveSegment(i);
    updatePoeng(i);
  };
  const handleSegmentedControl2 = (i) => {
    setActiveSegment2(i);
    updatePoeng2(i);
  };
  function oldGradeFinder(newName) {
    for (const [i, e] of localData.grades.value.entries()) {
      if (e.id == newName) {
        return (e.value + 1).toString() + " til";
      }
    }
    return "Ny";
  }
  function printUtdanninger(s) {
    const thisEd = karakterGrenser.find(
      (karakterGrenser) => karakterGrenser.studiekode === s
    );
    return (
      <TouchableOpacity
        style={GlobalStyles.row}
        onPress={() =>
          navigation.navigate("_EducationDetails", {
            postStudiekode: thisEd.studiekode,
          })
        }
      >
        <Text style={[GlobalStyles.listText, { width: "85%" }]}>
          {thisEd.studienavn} ({thisEd.lærerstedskode})
        </Text>
        <View style={GlobalStyles.listEndContainer}>
          <Text style={GlobalStyles.listText}>{thisEd.poenggrense}</Text>
        </View>
      </TouchableOpacity>
    );
  }
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
            paddingVertical={7}
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
              <View key={item.name}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>{item.value}</Text>
                  </View>
                </View>
                {index >= data1.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={GlobalStyles.whiteContainer}>
          <Text
            style={GlobalStyles.underTitleText}
            onPress={() => navigation.navigate("RetakeKalkulator")}
          >
            Disse fagene skal jeg ta opp:
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {localData.retakeClasses.map((item, index) => (
              <View key={item.id}>
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
                <View style={GlobalStyles.ItemSeparatorComponent}></View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate("RetakeKalkulator")}
            >
              <Text style={GlobalStyles.listText}>
                Trykk for å legge til fag
              </Text>
            </TouchableOpacity>
          </View>
          {localData.retakeClasses.length >= 1 ? (
            <View>
              <SegmentedControl
                tabs={["Konkurransepoeng", "23/5-poeng"]}
                textStyle={{ fontSize: 10 }}
                currentIndex={activeSegment2}
                onChange={(index) => handleSegmentedControl2(index)}
                paddingVertical={7}
                segmentedControlBackgroundColor="gainsboro"
                activeSegmentBackgroundColor="#4A90E2"
                activeTextColor="white"
                activeTextWeight="bold"
                textColor="black"
                containerStyle={{ marginTop: 10 }}
              />
              <Text style={styles.poeng}>{retakePoeng.toFixed(2)}</Text>
              <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
                Dine poeng med nye fag
              </Text>
            </View>
          ) : null}
        </View>

        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>Mine utdanninger:</Text>
          {/* <Button
            title="ok"
            onPress={() =>
            }
          /> */}
          <View style={GlobalStyles.greyContainer}>
            {localData.wantedEducations.studiekode.length >= 1 ? (
              localData.wantedEducations.studiekode.map((item, index) => (
                <View key={item}>
                  {printUtdanninger(item)}
                  {index >=
                  localData.wantedEducations.studiekode.length - 1 ? null : (
                    <View style={GlobalStyles.ItemSeparatorComponent}></View>
                  )}
                </View>
              ))
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate("Utforsk")}>
                <Text style={GlobalStyles.listText}>
                  Trykk for å legge til utdanninger
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={{ fontSize: 50 }}></Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
