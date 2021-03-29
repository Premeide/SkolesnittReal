import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { allClasseslist, localData } from "../../assets/data/GlobalData";
import styles from "./styles";
import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import SegmentedControl from "rn-segmented-control";

const HomeScreen = ({ navigation }) => {
  const [activeSegment, setActiveSegment] = useState(1);

  let [data2, setData2] = useState([
    { name: "Skolepoeng", value: 40.0 },
    { name: "Konkurransepoeng", value: 50.0 },
    { name: "23/5", value: 60.0 },
  ]);
  let [data1, setData1] = useState([
    { name: "Alderspoeng", value: 5 },
    { name: "Tilleggspoeng", value: localData.extraPoints.value },
    { name: "Real- og språkpoeng", value: 3 },
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
      newData2[2].value =
        karakterSnitt +
        newData1[0].value +
        newData1[1].value +
        newData1[2].value;
      setData2(newData2);
    }
  };

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
            tabs={["Skole", "Konkurranse", "23/5"]}
            textStyle={{ fontSize: 15 }}
            currentIndex={activeSegment}
            onChange={(index) => handleSegmentedControl(index)}
            paddingVertical={3}
            segmentedControlBackgroundColor="gainsboro"
            activeSegmentBackgroundColor="white"
            activeTextColor="black"
            activeTextWeight="bold"
            textColor="black"
          />
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
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene skal jeg ta opp:
          </Text>
          <TouchableOpacity
            style={GlobalStyles.greyContainer}
            onPress={() => navigation.navigate("RetakeKalkulator")}
          >
            {localData.retakeClasses.map((item, index) => (
              <View key={item.id}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.id}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>{item.value}</Text>
                  </View>
                </View>
                {index >= localData.retakeClasses.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </TouchableOpacity>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>Mine utdanninger:</Text>
          <View style={GlobalStyles.greyContainer}>
            {localData.wantedEducations.names.map((item, index) => (
              <View key={item}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>60.0</Text>
                  </View>
                </View>
                {index >= localData.wantedEducations.names.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
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
