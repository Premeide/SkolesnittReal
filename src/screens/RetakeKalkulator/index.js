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

const gradeTabs = ["1", "2", "3", "4", "5", "6"];

const RetakeKalkulator = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  let [grades, setGrades] = useState(localData.retakeClasses);
  const [allselected, setAllselected] = useState(false);
  let [delArray, setDelArray] = useState([]);
  const keyExtractorGrades = useCallback((item) => item.id, []);
  const keyExtractorModal = useCallback((item) => item.name, []);

  const renderItemModal = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => tabAdd(item.name)}>
        <Text style={{ color: "black", fontSize: 20, paddingVertical: 6 }}>
          <Icon name="caret-right" size={23} color="grey" /> {item.name}
        </Text>
      </TouchableOpacity>
    ),
    []
  );
  function forceingUpdate() {
    grades.length == 0 ? null : tabChange(grades[0].value, grades[0].id, false);
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

    setDelArray([]);
    forceingUpdate();
    return null;
  }
  function searchFilter(txt) {
    if (txt.length >= 1) {
      let newList = [];
      for (const [index, element] of allClasseslist.entries()) {
        if (element.name.toLowerCase().includes(txt.toLowerCase())) {
          newList.push(element);
        }
      }
      let newListNoDup = [];
      let foundDup = false;
      for (const [index, element] of newList.entries()) {
        for (const [idx, ele] of grades.entries()) {
          if (element.name === ele.id) {
            foundDup = true;
          }
        }
        foundDup ? null : newListNoDup.push(element);
        foundDup = false;
      }
      return newListNoDup;
    }
    return [];
  }
  const selectThis = (index) => {
    let tempDelArray = delArray;
    if (delArray.includes(index)) {
      tempDelArray = tempDelArray.filter((n) => {
        return n != index;
      });
    } else {
      tempDelArray.push(index);
    }
    if (tempDelArray.length == grades.length) {
      setAllselected(true);
    } else if (tempDelArray.length == 0) {
      setAllselected(false);
    }

    setDelArray(tempDelArray);
  };
  const deleteAll = () => {
    setGrades([]);
    localData.retakeClasses = [];

    setDelArray([]);
  };
  const selectAll = () => {
    let tempDelArray = [];

    setAllselected(!allselected);

    if (allselected) {
      null;
    } else {
      for (const [idx, ele] of grades.entries()) {
        tempDelArray.push(idx);
      }
    }

    setDelArray(tempDelArray);
  };
  const deleteSelected = () => {
    let tempGrades = grades;

    for (const [idx, ele] of delArray
      .sort(function (a, b) {
        return b - a;
      })
      .entries()) {
      tempGrades.splice(ele, 1);
    }
    setGrades(tempGrades);
    localData.retakeClasses = tempGrades;

    setDelArray([]);
  };
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={deleteSelected}
          >
            <Text style={styles.btnText}>Fjern Markerte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={selectAll}>
            <Text style={styles.btnText}>
              {allselected ? "Fjern markering" : "Marker alle"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={deleteAll}>
            <Text style={styles.btnText}>Fjern alle</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <FlatList
        data={grades}
        ListFooterComponent={() => <Text style={{ fontSize: 80 }}> </Text>}
        keyExtractor={keyExtractorGrades}
        renderItem={({ item, index }) => (
          <View>
            <View style={{ flexDirection: "row" }}>
              {isEditing ? (
                <CheckBox
                  value={delArray.includes(index)}
                  onChange={() => {
                    selectThis(index);
                    forceingUpdate();
                  }}
                />
              ) : null}
              <Text style={styles.txt2}>{item.id}</Text>
              {isEditing ? (
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => tabDelete(item.id)}
                >
                  <Icon name="remove" size={20} color="grey" />
                </TouchableOpacity>
              ) : null}
            </View>
            <SegmentedControl
              tabs={gradeTabs}
              currentIndex={item.value}
              onChange={(index) => tabChange(index, item.id, false)}
              paddingVertical={5}
              segmentedControlBackgroundColor="gainsboro"
              activeSegmentBackgroundColor="#03A9F4"
              activeTextColor="white"
              textColor="black"
            />
          </View>
        )}
      />

      <Modal transparent={true} visible={showModal}>
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={styles.modalContainer}>
            <Text style={styles.modaltxt}>Legg til fag</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="search" size={33} color="grey" />
              <TextInput
                backgroundColor="#eaeaea"
                borderRadius={10}
                placeholder="Søk fag"
                style={{ height: 40, width: 250, paddingLeft: 10 }}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
            <FlatList
              data={searchFilter(searchText)}
              keyExtractor={keyExtractorModal}
              renderItem={renderItemModal}
            />
            <Button title="done" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>

      <View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Tab", { screen: "Hjem" })}
          style={styles.txt}
        >
          <Text style={styles.regnButton}>Regn ut </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={toggleIsEditing}
          style={[styles.fab, { bottom: 100, width: 100 }]}
        >
          <Text style={styles.regnButton}>Rediger</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RetakeKalkulator;
