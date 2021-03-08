import React, { useEffect } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SegmentedControl from "rn-segmented-control";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import { dataFile, allClasseslist } from "../dataFile";

const gradeTabs = ["1", "2", "3", "4", "5", "6"];

const MyGradesScreen = ({ navigation }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  let [grades, setGrades] = React.useState(dataFile[3].value);

  function forceingUpdate() {
    tabChange(grades[0].value, grades[0].id);
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
    } else {
      null;
    }
    forceingUpdate();
  }
  function tabChange(idx, name, isExam) {
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
    forceingUpdate();
    return null;
  }
  function searchFilter(txt) {
    if (txt.length >= 2) {
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
    return [{ name: "Skriv inn minst 2 bokstaver" }];
  }
  useEffect(() => {
    let _score = grades.length;
    for (const [i, e] of grades.entries()) {
      _score += e.value;
    }

    dataFile[0].value = ((_score / grades.length) * 10).toFixed(2);
    dataFile[3].value = grades;
  }, [grades]);

  return (
    <View style={styles.container}>
      <FlatList
        ListFooterComponent={() => <Text style={{ fontSize: 80 }}> </Text>}
        keyExtractor={(item) => item.id}
        data={grades}
        renderItem={({ item }) => (
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt2}>{item.id}</Text>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => tabDelete(item.id)}
              >
                <Icon name="remove" size={20} color="grey" />
              </TouchableOpacity>
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey" }}>Hatt eksamen? </Text>
              <TouchableOpacity
                onPress={() => {
                  item.exam ? null : (item.exam = true);
                  forceingUpdate();
                }}
              >
                <Text style={{ color: "black" }}>Ja </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  item.exam ? (item.exam = false) : null;
                  forceingUpdate();
                }}
              >
                <Text style={{ color: "black" }}> Nei</Text>
              </TouchableOpacity>
            </View>
            {item.exam ? (
              <SegmentedControl
                paddingVertical={5}
                tabs={gradeTabs}
                currentIndex={item.exva}
                onChange={(index) => tabChange(index, item.id, true)}
              />
            ) : null}
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
                bor
                borderRadius={10}
                placeholder="Søk fag"
                style={{ height: 40, width: 250, paddingLeft: 10 }}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
            <FlatList
              data={searchFilter(searchText)}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => tabAdd(item.name)}>
                  <Text
                    style={{ color: "black", fontSize: 20, paddingVertical: 6 }}
                  >
                    <Icon name="caret-right" size={23} color="grey" />{" "}
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Button title="done" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>

      <View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.txt}
        >
          <Text style={styles.regnButton}>Regn ut </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 15,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  txt: {
    position: "absolute",
    width: 150,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    right: 120,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,

    fontSize: 30,
    color: "white",
  },
  txt2: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  modaltxt: {
    alignSelf: "center",
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  regnButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
});
export default MyGradesScreen;
