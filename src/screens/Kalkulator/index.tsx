import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { localData, allClasseslist } from "../../assets/data/GlobalData";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import * as Animatable from "react-native-animatable";
import { GradesInterface } from "../../assets/data/Interfaces";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import GradeItem from "../../components/GradeItem";
import AddOrDeleteBtn from "../../components/AddOrDeleteBtn";
import { FontAwesome5 } from "@expo/vector-icons";

const KalkulatorScreen = ({ navigation }) => {
  const [grades, setGrades] = useState(localData.grades.value);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [snitt, setSnitt] = useState(snittCalculator(localData.grades.value));

  const translateX = useSharedValue(0);

  const keyExtractorGrades = useCallback((item) => item.id, []);
  const keyExtractorModal = useCallback((item) => item.name, []);

  useEffect(() => {
    console.log("-----------------useEffect..");
    setSnitt(snittCalculator(grades));
    localData.grades.value = grades;
  }, [grades]);
  const tabDelete = useCallback((delGrade: GradesInterface) => {
    console.log("tabDelete..", delGrade.id);
    setGrades((grades) =>
      grades.filter((element) => element.id !== delGrade.id)
    );
  }, []);
  const tabAdd = (name: string) => {
    console.log("tabAdd..", name);

    let isDuplicate = false;
    let isDuplicateElement = { value: 0, id: "_", exam: false, exva: 0 };
    for (const [index, element] of grades.entries()) {
      if (element.id === name) {
        isDuplicate = true;
        isDuplicateElement = element;
      }
    }
    if (!isDuplicate) {
      let newGrades = grades;
      newGrades.push({ value: 0, id: name, exam: false, exva: 0 });

      setGrades(newGrades);
    } else {
      tabDelete(isDuplicateElement);
    }
    forceUpdate();
  };
  const tabChange = useCallback((newGrade: GradesInterface) => {
    console.log("tabChange..", newGrade.id);

    setGrades((grades: any) => {
      let tmpGrades = [];
      for (const [_, element] of grades.entries()) {
        if (element.id === newGrade.id) {
          tmpGrades.push({
            id: newGrade.id,
            value: newGrade.value,
            exam: newGrade.exam,
            exva: newGrade.exva,
          });
        } else {
          tmpGrades.push(element);
        }
      }
      return tmpGrades;
    });
  }, []);
  const hadExamChange = useCallback((grade: GradesInterface) => {
    console.log("hadExamChange..", grade.id);
    setGrades((grades: any) => {
      let tmpGrades = [];
      for (const [_, element] of grades.entries()) {
        if (element.id === grade.id) {
          tmpGrades.push({
            id: grade.id,
            value: grade.value,
            exam: !grade.exam,
            exva: grade.exva,
          });
        } else {
          tmpGrades.push(element);
        }
      }
      return tmpGrades;
    });
  }, []);
  const toggleIsEditing = useCallback(() => {
    console.log("toggleIsEditing..");

    setIsEditing((isEditing) => {
      isEditing
        ? (translateX.value = withSpring(0))
        : (translateX.value = withSpring(100));
      return !isEditing;
    });
  }, []);
  const toggleModal = useCallback(() => {
    console.log("toggleModal..");

    setShowModal((showModal) => !showModal);
  }, []);
  const checkboxHandler = (name: string) => {
    let isIncluded = grades.find((grades) => grades.id === name);
    if (isIncluded == undefined) {
      return false;
    }
    return true;
  };
  const forceUpdate = () => {
    console.log("-- ForceUpdate -- ");
    grades.length == 0 ? setGrades([]) : tabChange(grades[0]);
  };
  function snittCalculator(gradeList: any) {
    let sum = 0;
    let numOfClasses = 0;

    for (const [i, e] of gradeList.entries()) {
      sum += e.value + 1;
      numOfClasses += 1;
      if (e.exam) {
        sum += e.exva + 1;
        numOfClasses += 1;
      }
    }
    return ((sum * 10) / numOfClasses).toFixed(2);
  }
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar style="auto" />
      <View style={styles.karakterElevationContainer}>
        <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
          Karaktersnitt:
        </Text>
        <Text style={styles.poeng}>{snitt}</Text>
      </View>
      <FlatList
        data={grades}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <Text style={{ fontSize: 65 }}> </Text>}
        ListHeaderComponent={() => <Text style={{ fontSize: 60 }}> </Text>}
        keyExtractor={keyExtractorGrades}
        renderItem={({ item }) => (
          <GradeItem
            grade={item}
            tabChange={tabChange}
            tabDelete={tabDelete}
            hadExamChange={hadExamChange}
            translateX={translateX}
          />
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
              onChangeText={(text) => console.log("Here1")} // setSearchText(text)
            />
            <View style={[GlobalStyles.greyContainer, { height: "90%" }]}>
              <FlatList
                data={allClasseslist}
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
                      {checkboxHandler(item.name) ? (
                        <FontAwesome5
                          name={"check-circle"}
                          size={25}
                          color="black"
                        />
                      ) : (
                        <FontAwesome5 name={"circle"} size={25} color="black" />
                      )}
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
      <AddOrDeleteBtn
        toggleIsEditing={toggleIsEditing}
        toggleModal={toggleModal}
        isEditing={isEditing}
      />
    </SafeAreaView>
  );
};

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
