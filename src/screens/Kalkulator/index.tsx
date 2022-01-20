import React, { useState, useCallback, useEffect } from "react";
import {} from "expo-status-bar";
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

const DEFAULT_GRADE = { id: "-", value: 0, includeExam: false, examValue: 0 };

const KalkulatorScreen = ({ navigation }: { navigation: any }) => {
  const [grades, setGrades] = useState(localData.grades);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [snitt, setSnitt] = useState(snittCalculator(localData.grades));

  const translateX = useSharedValue(0);

  const keyExtractorGrades = useCallback((item) => item.id, []);
  const keyExtractorModal = useCallback((item) => item.name, []);

  useEffect(() => {
    console.log("KALK: -----------------useEffect..");
    setSnitt(snittCalculator(grades));
    localData.grades = grades;
  }, [grades]);
  const tabDelete = useCallback((delGrade: GradesInterface) => {
    console.log("tabDelete..", delGrade.id);
    setGrades((grades) =>
      grades.filter((element) => element.id !== delGrade.id)
    );
  }, []);
  const tabAdd = (name: string) => {
    console.log("tabAdd..", name);
    if (grades.find((item) => item.id === name) === undefined) {
      setGrades((prevGrades) => [
        ...prevGrades,
        { ...DEFAULT_GRADE, id: name },
      ]);
    } else {
      tabDelete({ ...DEFAULT_GRADE, id: name });
    }
  };
  const tabChange = useCallback((newGrade: GradesInterface) => {
    console.log("tabChange..", newGrade.id);

    setGrades((grades) => {
      let tmpGrades = [...grades];
      tmpGrades[grades.findIndex((item) => item.id === newGrade.id)] = newGrade;
      return tmpGrades;
    });
  }, []);
  const hadExamChange = useCallback((grade: GradesInterface) => {
    console.log("hadExamChange..", grade.id);
    setGrades((grades) => {
      let tmpGrades = [...grades];
      tmpGrades[grades.findIndex((item) => item.id === grade.id)] = {
        ...grade,
        includeExam: !grade.includeExam,
      };
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
      if (e.includeExam) {
        sum += e.examValue + 1;
        numOfClasses += 1;
      }
    }
    return ((sum * 10) / numOfClasses).toFixed(2);
  }
  const renderItem = ({ item }: { item: GradesInterface }) => (
    <GradeItem
      grade={item}
      tabChange={tabChange}
      tabDelete={tabDelete}
      hadExamChange={hadExamChange}
      translateX={translateX}
    />
  );
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.karakterElevationContainer}>
        <Text style={[GlobalStyles.smallText, { textAlign: "center" }]}>
          Karaktersnitt:
        </Text>
        <Text style={styles.poeng}>{snitt}</Text>
      </View>
      <FlatList
        data={grades}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={6}
        ListFooterComponent={() => <Text style={{ fontSize: 65 }}> </Text>}
        ListHeaderComponent={() => <Text style={{ fontSize: 60 }}> </Text>}
        keyExtractor={keyExtractorGrades}
        renderItem={renderItem}
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
      {localData.firstTime.Kalk ? (
        <TouchableOpacity
          style={[
            GlobalStyles.customBtnContainer,
            { bottom: GlobalStyles.customBtn2Bottom.bottom },
          ]}
          onPress={() => {
            localData.firstTime.Kalk = false;
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
