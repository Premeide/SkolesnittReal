import React, { useCallback, useState } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SegmentedControl from "rn-segmented-control";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData, allClasseslist } from "../../assets/data/GlobalData";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";

const gradeTabs = ["1", "2", "3", "4", "5", "6"];

const RetakeKalkulatorScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(
    localData.retakeClasses >= 1 ? false : true
  );
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  let [grades, setGrades] = useState(localData.retakeClasses);
  const keyExtractorGrades = useCallback((item) => item.id, []);
  const keyExtractorModal = useCallback((item) => item.name, []);

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
    setIsEditing(!isEditing);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.whiteContainer2}>
        {isEditing ? (
          <FlatList
            data={grades}
            ItemSeparatorComponent={() => (
              <View style={GlobalStyles.ItemSeparatorComponent} />
            )}
            ListFooterComponent={() => <Text style={{ fontSize: 160 }}> </Text>}
            keyExtractor={keyExtractorGrades}
            renderItem={({ item }) => (
              <View style={GlobalStyles.row}>
                <Text style={[GlobalStyles.listText, { width: "90%" }]}>
                  {item.id}
                </Text>
                <View style={GlobalStyles.listEndContainer}>
                  <Icon
                    name="remove"
                    size={30}
                    color="red"
                    onPress={() => tabDelete(item.id)}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={grades}
            ListFooterComponent={() => <Text style={{ fontSize: 160 }}> </Text>}
            keyExtractor={keyExtractorGrades}
            renderItem={({ item, index }) => (
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
            )}
          />
        )}
        <Modal transparent={true} visible={showModal}>
          <View style={{ backgroundColor: "#eaeaeaaa", flex: 1 }}>
            <View style={GlobalStyles.modalContainer}>
              <TextInput
                style={GlobalStyles.textInput2}
                placeholder="Søk utdanninger"
                onChangeText={(text) => setSearchText(text)}
              />
              <View style={GlobalStyles.greyContainer}>
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
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={GlobalStyles.customBtnContainer}
          >
            <CustomBtn text="Ferdig" />
          </TouchableOpacity>
        </Modal>
      </View>

      {isEditing ? (
        <TouchableOpacity
          style={[
            GlobalStyles.customBtnContainer,
            { bottom: GlobalStyles.customBtn2Bottom.bottom },
          ]}
          onPress={() => setShowModal(true)}
        >
          <View style={GlobalStyles.addBtn}>
            <Text style={GlobalStyles.addText}>Legg til fag</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={() => toggleIsEditing()}
        style={GlobalStyles.customBtnContainer}
      >
        <CustomBtn text={isEditing ? "Ferdig" : "Endre fag"} />
      </TouchableOpacity>
    </View>
  );
};

export default RetakeKalkulatorScreen;
