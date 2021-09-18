import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import {
  allClasseslist,
  localData,
  basisClasses,
} from "../../assets/data/GlobalData";
import { useIsFocused } from "@react-navigation/native";
import SegmentedControl from "rn-segmented-control";

const RecommendScreen = ({ navigation }) => {
  const [activeSegment2, setActiveSegment2] = useState(0);
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const isFocused = useIsFocused(); //useeffect emptyarrray gjør jobben kansj
  let [retakePoeng, setRetakePoeng] = useState(3000);
  useEffect(() => {
    updatePoeng2(activeSegment2);
  }, [isFocused]);

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
  function alderspoeng(segIndex) {
    let fødselsår = localData.born.value;
    let _alderspoeng = ((segIndex == 1 ? 1998 : 2002) - fødselsår) * 2;
    _alderspoeng = Math.min(Math.max(_alderspoeng, 0), 8);
    return _alderspoeng;
  }
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
          navigation.navigate("RecommendDetails", {
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
      <View style={{ height: "5%" }} />
      <ScrollView>
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
      </ScrollView>
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

export default RecommendScreen;
{
  /* <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene kan du forbedre:(dummyData)
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {dummyData.map((item, index) => (
              <View key={item.name}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>
                      fra {item.oldValue} til {item.value}
                    </Text>
                  </View>
                </View>
                {index >= dummyData.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene trenger du:(dummyData)
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {dummyData2.map((item, index) => (
              <View key={item.name}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>{item.value}</Text>
                  </View>
                </View>
                {index >= dummyData2.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene kan du bytte:(dummyData)
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {dummyData3.map((item, index) => (
              <View key={item.to}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>fra {item.from}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>til {item.to}</Text>
                  </View>
                </View>
                {index >= dummyData3.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View> */
}
//const dummyData = [
//   { name: "Matematikk R2", value: 6, oldValue: 5 },
//   { name: "Biologi 1", value: 5, oldValue: 4 },
//   { name: "Samfunnsfag", value: 3, oldValue: 2 },
//   { name: "Engelsk", value: 3, oldValue: 1 },
// ];
// const dummyData2 = [
//   { name: "Matematikk R2", value: "MEROD" },
//   { name: "Kjemi 2", value: "MEROD" },
//   { name: "Samfunnsfag", value: "GENS" },
// ];
// const dummyData3 = [
//   { to: "Matematikk S2", from: "Matematikk R1" },
//   { to: "Rettslære 1", from: "Naturfag" },
//   { to: "Sosialkunnskap", from: "Geografi" },
// ];
