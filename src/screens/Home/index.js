import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { allClasseslist, localData } from "../../assets/data/GlobalData";
import styles from "./styles";
import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import SegmentedControl from "rn-segmented-control";
import { useIsFocused } from "@react-navigation/native";
const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    updatePoeng(activeSegment);
  }, [isFocused]);
  const [activeSegment, setActiveSegment] = useState(1);
  const [activeSegment2, setActiveSegment2] = useState(1);
  const karakterGrenser = require("../../assets/data/karaktergrense.json");

  let [data2, setData2] = useState([
    { name: "Skolepoeng", value: 400.0 },
    { name: "Konkurransepoeng", value: 500.0 },
    { name: "23/5", value: 600.0 },
  ]);
  let [data3, setData3] = useState([
    { name: "Skolepoeng", value: 100 },
    { name: "Konkurransepoeng", value: 200 },
    { name: "23/5", value: 300 },
  ]);
  let [data1, setData1] = useState([
    { name: "Alderspoeng", value: 50 },
    { name: "Tilleggspoeng", value: localData.extraPoints.value },
    { name: "Real- og språkpoeng", value: 30 },
  ]);
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
    return sum;
  }
  function alderspoeng(segIndex) {
    let fødselsår = localData.born.value;
    let _alderspoeng = ((segIndex == 2 ? 1998 : 2002) - fødselsår) * 2;
    _alderspoeng = Math.min(Math.max(_alderspoeng, 0), 8);
    return _alderspoeng;
  }
  const updatePoeng = (segIndex) => {
    let _grades = localData.grades.value;
    let sum = 0;
    let numOfExams = 0;
    let karakterSnitt = 0;
    let newData1 = 0;
    let newData2 = data2;
    if (_grades.length > 0) {
      for (const [i, e] of _grades.entries()) {
        sum += e.value + 1;
        if (e.exam) {
          sum += e.exva + 1;
          numOfExams += 1;
        }
      }
      karakterSnitt = (sum * 10) / (_grades.length + numOfExams);
    }
    3;
    if (segIndex == 0) {
      newData1 = [
        { name: "Alderspoeng", value: 0 },
        { name: "Tilleggspoeng", value: 0 },
        { name: "Real- og språkpoeng", value: realogspråkpoeng() },
      ];
      setData1(newData1);
      newData2[0].value =
        karakterSnitt +
        newData1[0].value +
        newData1[1].value +
        newData1[2].value;
      setData2(newData2);
    } else if (segIndex == 1) {
      newData1 = [
        { name: "Alderspoeng", value: alderspoeng(segIndex) },
        { name: "Tilleggspoeng", value: localData.extraPoints.value },
        { name: "Real- og språkpoeng", value: realogspråkpoeng() },
      ];
      setData1(newData1);
      newData2[1].value =
        karakterSnitt +
        newData1[0].value +
        newData1[1].value +
        newData1[2].value;
      setData2(newData2);
    } else if (segIndex == 2) {
      newData1 = [
        { name: "Alderspoeng", value: alderspoeng(segIndex) },
        { name: "Tilleggspoeng", value: localData.extraPoints.value },
        { name: "Real- og språkpoeng", value: realogspråkpoeng() },
      ];
      setData1(newData1);
      newData2[2].value = 500;
      // karakterSnitt +
      // newData1[0].value +
      // newData1[1].value +
      // newData1[2].value;
      setData2(newData2);
    }
  };
  const updatePoeng2 = (segIndex) => {};
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
        return e.value + 1;
      }
    }
    return "0";
  }
  function printUtdanninger(s) {
    const thisEd = karakterGrenser.find(
      (karakterGrenser) => karakterGrenser.studiekode === s
    );
    return (
      <TouchableOpacity
        style={GlobalStyles.row}
        // onPress={() =>
        //   navigation.navigate("Utforsk", {
        //     screen: "EducationDetails",
        //     postStudiekode: thisEd.studiekode,
        //   })
        // }
      >
        <Text style={GlobalStyles.listText}>
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
            tabs={["Skolepoeng", "Konkurransepoeng", "23/5-poeng"]}
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
          <Text style={styles.poeng}>
            {data2[activeSegment].value.toFixed(2)}
          </Text>
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
                  <Text style={GlobalStyles.listText}>{item.id}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>
                      {oldGradeFinder(item.id)} til {item.value + 1}
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
                Trykk for å legge til flere fag
              </Text>
            </TouchableOpacity>
          </View>
          {localData.retakeClasses.length >= 1 ? (
            <View>
              <SegmentedControl
                tabs={["Skolepoeng", "Konkurransepoeng", "23/5-poeng"]}
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
              <Text style={styles.poeng}>
                {data3[activeSegment2].value.toFixed(2)}
              </Text>
              <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
                Dine poeng med nye fag
              </Text>
            </View>
          ) : null}
        </View>

        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>Mine utdanninger:</Text>
          {/* <Button title="ok" onPress={()=>console.log(localData.retakeClasses.length)}/> */}
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
