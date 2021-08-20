import React, { useCallback, useRef, useState } from "react";
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
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import * as Animatable from "react-native-animatable";

const gradeTabs = ["1", "2", "3", "4", "5", "6"];

const RetakeKalkulatorScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(
    localData.retakeClasses.length >= 1 ? false : true
  );
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  let [grades, setGrades] = useState(localData.retakeClasses);
  const keyExtractorGrades = useCallback((item) => item.id, []);
  const keyExtractorModal = useCallback((item) => item.name, []);
  const editWidth = useRef(new Animated.Value(0)).current;
  const modalPos = useRef(new Animated.Value(0)).current;

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
      : tabChange(grades[0].value, grades[0].id);
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
      _grades.push({ value: 0, id: name });
      setGrades(_grades);
      localData.retakeClasses = _grades;
    } else {
      null;
    }
    forceingUpdate();
  }
  function tabChange(idx, name) {
    let _grades = [];
    for (const [index, element] of grades.entries()) {
      if (element.id === name) {
        _grades.push({
          value: idx,
          id: name,
        });
      } else {
        _grades.push(grades[index]);
      }
    }

    setGrades(_grades);
    localData.retakeClasses = _grades;

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
    localData.retakeClasses = _grades;

    forceingUpdate();
    return null;
  }
  function searchFilter(txt) {
    if (txt) {
      let newList = [];
      for (const [index, element] of allClasseslist.entries()) {
        if (element.name.toLowerCase().includes(txt.toLowerCase())) {
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
  const toggleIsEditing = () => {
    isEditing ? removeEditWidth() : addEditWidth();
    setIsEditing(!isEditing);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.whiteContainer2}>
        <FlatList
          data={grades}
          ListFooterComponent={() => <Text style={{ fontSize: 160 }}> </Text>}
          ItemSeparatorComponent={() => (
            <View
              style={[
                GlobalStyles.ItemSeparatorComponent,
                { marginVertical: 5 },
              ]}
            />
          )}
          keyExtractor={keyExtractorGrades}
          renderItem={({ item, index }) => (
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
              </View>
            </View>
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
                placeholder="Søk utdanninger"
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
                      <Text style={GlobalStyles.listText}>{item.name}</Text>
                      <View style={GlobalStyles.listEndContainer}>
                        <CheckBox value={checkboxHandler(item.name)} />
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
      </View>

      <View style={[GlobalStyles.customBtnContainer, { flexDirection: "row" }]}>
        <TouchableOpacity
          style={[splitBtnStyle.container, { backgroundColor: "green" }]}
          onPress={() => setShowModal(true)}
        >
          <Text style={splitBtnStyle.text}>Legg til fag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[splitBtnStyle.container, { backgroundColor: "red" }]}
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
    borderWidth: 1,
    borderColor: "white",
  },
  text: {
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "white",
  },
});
export default RetakeKalkulatorScreen;
