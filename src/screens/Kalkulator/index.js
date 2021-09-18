import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet,
} from "react-native";
import SegmentedControl from "rn-segmented-control";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData, allClasseslist } from "../../assets/data/GlobalData";
import CheckBox from "@react-native-community/checkbox";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import * as Animatable from "react-native-animatable";

const gradeTabs = ["1", "2", "3", "4", "5", "6"];

const KalkulatorScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  let [grades, setGrades] = useState(localData.grades.value);
  const keyExtractorGrades = useCallback((item) => item.id, []);
  const keyExtractorModal = useCallback((item) => item.name, []);
  const editWidth = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(false);
  const [snitt, setSnitt] = useState(snittCalc());

  useEffect(() => {
    setSnitt(snittCalc().toFixed(2));
    console.log("CL ing");
  }, [grades]);

  function addEditWidth() {
    Animated.spring(editWidth, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }
  function removeEditWidth() {
    Animated.timing(editWidth, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }
  function forceingUpdate() {
    grades.length == 0
      ? setGrades([])
      : tabChange(grades[0].value, grades[0].id, false);
    return null;
  }
  function tabAdd(name) {
    let isDuplicate = false;

    for (const [index, element] of grades.entries()) {
      if (element.id === name) {
        isDuplicate = true;
      }
    }
    if (!isDuplicate) {
      let _grades = grades;
      _grades.push({ value: 0, id: name, exam: false, exva: 0 });
      setGrades(_grades);
      localData.grades.value = _grades;
    } else {
      tabDelete(name);
    }
    forceingUpdate();
  }
  function tabChange(idx, name, isExam) {
    //toggleisediting excluding forceupdates
    if (!(idx == grades[0].value) || !(name == grades[0].id)) {
      isEditing ? toggleIsEditing() : null;
    }

    let _grades = [];
    if (!isExam) {
      for (const [index, element] of grades.entries()) {
        if (element.id === name) {
          _grades.push({
            value: idx,
            id: name,
            exam: element.exam,
            exva: element.exva,
          });
        } else {
          _grades.push(grades[index]);
        }
      }
    } else {
      for (const [index, element] of grades.entries()) {
        if (element.id === name) {
          _grades.push({
            value: element.value,
            id: name,
            exam: element.exam,
            exva: idx,
          });
        } else {
          _grades.push(grades[index]);
        }
      }
    }

    setGrades(_grades);
    localData.grades.value = _grades;
    return null;
  }
  function tabDelete(name) {
    let _grades = grades;

    for (const [index, element] of grades.entries()) {
      if (element.id === name) {
        _grades.splice(index, 1);
      }
    }
    setGrades(_grades);
    localData.grades.value = _grades;

    forceingUpdate();
    return null;
  }
  function searchFilter(_txt) {
    let txt = _txt.trim().toLowerCase();
    if (txt) {
      let newList = [];
      for (const [index, element] of allClasseslist.entries()) {
        if (element.name.toLowerCase().includes(txt)) {
          newList.push(element);
        }
      }
      return newList;
    }
    return allClasseslist;
  }
  function checkboxHandler(name) {
    let isIncluded = grades.find((grades) => grades.id === name);
    if (isIncluded == undefined) {
      isIncluded = false;
    } else {
      isIncluded = true;
    }
    return isIncluded;
  }
  function snittCalc() {
    let snitt = 0;
    let sum = 0;
    let numOfClasses = 0;
    let _grades = localData.grades.value;
    for (const [i, e] of _grades.entries()) {
      sum += e.value + 1;
      numOfClasses += 1;
      if (e.exam) {
        sum += e.exva + 1;
        numOfClasses += 1;
      }
    }
    snitt = (sum * 10) / numOfClasses;
    console.log(snitt); // prints 3x ??!?
    return snitt;
  }
  const toggleIsEditing = () => {
    isEditing ? removeEditWidth() : addEditWidth();
    setIsEditing(!isEditing);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.karakterElevationContainer}>
        <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
          Karaktersnitt:
        </Text>
        <Text style={styles.poeng}>{snitt}</Text>
      </View>
      <FlatList
        data={grades}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <Text style={{ fontSize: 25 }}> </Text>}
        ListHeaderComponent={() => <Text style={{ fontSize: 60 }}> </Text>}
        keyExtractor={keyExtractorGrades}
        renderItem={({ item, index }) => (
          <Animatable.View
            style={GlobalStyles.whiteContainer}
            animation="fadeInRight"
            duration={600}
            delay={200 + index * 80}
          >
            <View style={{ flexDirection: "row" }}>
              <Animated.View
                style={{
                  width: editWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "20%"],
                  }),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="remove"
                  size={45}
                  color="red"
                  onPress={() => tabDelete(item.id)}
                />
              </Animated.View>
              <View>
                <Text style={GlobalStyles.kalkText}>{item.id}</Text>
                <SegmentedControl
                  tabs={gradeTabs}
                  currentIndex={item.value}
                  onChange={(index) => tabChange(index, item.id, false)}
                  paddingVertical={5}
                  segmentedControlBackgroundColor="gainsboro"
                  activeSegmentBackgroundColor={GlobalStyles.blueColor.color}
                  activeTextColor="white"
                  textColor="black"
                  activeTextWeight="bold"
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "grey" }}>Hatt eksamen? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      item.exam ? (item.exam = false) : (item.exam = true);
                      forceingUpdate();
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 15,
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.exam ? "Nei" : "Ja"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {item.exam ? (
                  <SegmentedControl
                    paddingVertical={5}
                    tabs={gradeTabs}
                    currentIndex={item.exva}
                    onChange={(index) => tabChange(index, item.id, true)}
                    segmentedControlBackgroundColor="gainsboro"
                    activeSegmentBackgroundColor={GlobalStyles.blueColor.color}
                    activeTextColor="white"
                    textColor="black"
                    activeTextWeight="bold"
                  />
                ) : null}
              </View>
            </View>
            {index >= grades.length - 1 ? (
              <Animatable.View animation="zoomOutDown">
                <Text style={GlobalStyles.kalkText}>Goodbye</Text>
                <SegmentedControl
                  tabs={gradeTabs}
                  currentIndex={4}
                  paddingVertical={5}
                  segmentedControlBackgroundColor="gainsboro"
                  activeSegmentBackgroundColor={GlobalStyles.blueColor.color}
                  activeTextColor="white"
                  textColor="black"
                  activeTextWeight="bold"
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "grey" }}>Hatt eksamen? </Text>
                  <Text style={{ color: "black" }}>Ja </Text>
                  <Text style={{ color: "black" }}> Nei</Text>
                </View>
              </Animatable.View>
            ) : null}
          </Animatable.View>
        )}
      />
      <Modal transparent={true} visible={showModal}>
        <Animatable.View
          style={{ backgroundColor: "grey", flex: 1 }}
          animation="fadeIn"
          duration={300}
        >
          <View style={GlobalStyles.modalContainer}>
            <TextInput
              style={GlobalStyles.textInput2}
              placeholder="Søk fag"
              onChangeText={(text) => setSearchText(text)}
            />
            <View style={[GlobalStyles.greyContainer, { height: "90%" }]}>
              <FlatList
                data={searchFilter(searchText)}
                ItemSeparatorComponent={() => (
                  <View style={GlobalStyles.ItemSeparatorComponent} />
                )}
                keyExtractor={keyExtractorModal}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={GlobalStyles.row}
                    onPress={() => tabAdd(item.name)}
                  >
                    <Text style={[GlobalStyles.listText, { width: "90%" }]}>
                      {item.name}
                    </Text>
                    <View style={GlobalStyles.listEndContainer}>
                      <CheckBox
                        value={checkboxHandler(item.name)}
                        onChange={() => tabAdd(item.name)}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Animatable.View>
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={GlobalStyles.customBtnContainer}
        >
          <CustomBtn text="Ferdig" />
        </TouchableOpacity>
      </Modal>
      {localData.firstTimeKalk.value ? (
        <TouchableOpacity
          style={[
            GlobalStyles.customBtnContainer,
            { bottom: GlobalStyles.customBtn2Bottom.bottom },
          ]}
          onPress={() => {
            localData.firstTimeKalk.value = false;
            navigation.navigate("Tab", { screen: "Hjem" });
          }}
        >
          <View style={GlobalStyles.addBtn}>
            <Text style={GlobalStyles.addText}>Fortsett</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <View style={[GlobalStyles.customBtnContainer, { flexDirection: "row" }]}>
        <TouchableOpacity
          style={[splitBtnStyle.container, { backgroundColor: "#3EB489" }]}
          onPress={() => setShowModal(true)}
        >
          <Text style={splitBtnStyle.text}>Legg til fag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[splitBtnStyle.container, { backgroundColor: "#FF2400" }]}
          onPress={toggleIsEditing}
        >
          <Text style={splitBtnStyle.text}>
            {isEditing ? "Ferdig" : "Fjern fag"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const splitBtnStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#52006A",
  },
  text: {
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "white",
  },
});

const styles = StyleSheet.create({
  poeng: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.blueColor.color,
  },
  karakterElevationContainer: {
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#52006A",
    borderRadius: 20,
    width: "94%",
    top: "6%",
    right: "3%",
    position: "absolute",
  },
});

export default KalkulatorScreen;
