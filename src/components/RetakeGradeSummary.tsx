import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import PlussMinusBtns from "./PlussMinusBtns";
import List from "./List";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import CustomBtn from "./CustomBtn";

const NYE_ALDERSPOENG = "Ny alderspoeng";
const NYE_TILLEGGSPOENG = "Ny tilleggspoeng";
const NYE_REAL_OG_SPRÅKPOENG = "Ny real- og språkpoeng";
const NYE_KARAKTERSNITT = "Ny karaktersnitt";

type SummaryGradeItem = {
  name: string;
  value: number;
};
interface RetakeGradeSummaryProps {
  navigation: any;

  retakeTotalPoints: 100;
  retakeAlderspoeng: 0;
  retakeExtraPoints: 0;
  retakeRealfagspoeng: 100;
  retakeSnitt: 70.0;

  updateRetakeAlderspoeng: () => void;
  updateRetakeExtraPoints: () => void;
  updateRetakeTotalPoints: () => void;
  updateRetakeRealfagspoeng: () => void;
  updateRetakeSnitt: () => void;

  increaseRetakeAlderspoeng: (add: number) => void;
  increaseRetakeExtraPoints: (add: number) => void;
}

const RetakeGradeSummary: React.FC<RetakeGradeSummaryProps> = (props) => {
  const [summaryList, setSummaryList] = useState<SummaryGradeItem[]>();
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      props.updateRetakeAlderspoeng();
      props.updateRetakeExtraPoints();
      props.updateRetakeRealfagspoeng();
      props.updateRetakeSnitt();
      props.updateRetakeTotalPoints();
      updateSummaryList();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      updateSummaryList();
    }
  }, [
    props.retakeAlderspoeng,
    props.retakeExtraPoints,
    props.retakeRealfagspoeng,
  ]);
  function updateSummaryList() {
    setSummaryList([
      {
        name: NYE_ALDERSPOENG,
        value: props.retakeAlderspoeng,
      },
      {
        name: NYE_TILLEGGSPOENG,
        value: props.retakeExtraPoints,
      },
      {
        name: NYE_REAL_OG_SPRÅKPOENG,
        value: props.retakeRealfagspoeng,
      },
      {
        name: NYE_KARAKTERSNITT,
        value: props.retakeSnitt,
      },
    ]);
  }
  function increaseRetakeAlderspoengHandler(dx: number) {
    props.increaseRetakeAlderspoeng(dx);
    props.updateRetakeTotalPoints();
  }
  function increaseRetakeExtraPoints(dx: number) {
    props.increaseRetakeExtraPoints(dx);
    props.updateRetakeTotalPoints();
  }
  return (
    <View style={GlobalStyles.whiteContainer}>
      <Text
        style={[GlobalStyles.smallText, { textAlign: "center" }]}
        onPress={() => setShowModal(true)}
      >
        Dine poeng med nye fag{" "}
        <FontAwesome5
          name={"question-circle"}
          size={10}
          color={GlobalStyles.blueColor.color}
        />
      </Text>

      <Text style={styles.poeng}>{props.retakeTotalPoints}</Text>
      <View style={GlobalStyles.greyContainer}>
        <List
          data={summaryList}
          keyExtractor={(e: any) => e.name}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item, index }) => (
            <View style={GlobalStyles.row}>
              <Text style={[GlobalStyles.listText, { width: "70%" }]}>
                {item.name}
              </Text>
              {item.name == NYE_ALDERSPOENG ? (
                <PlussMinusBtns
                  onPressMinus={() => increaseRetakeAlderspoengHandler(-1)}
                  onPressPlus={() => increaseRetakeAlderspoengHandler(1)}
                />
              ) : null}
              {item.name == NYE_TILLEGGSPOENG ? (
                <PlussMinusBtns
                  onPressMinus={() => increaseRetakeExtraPoints(-1)}
                  onPressPlus={() => increaseRetakeExtraPoints(1)}
                />
              ) : null}
              <View style={GlobalStyles.listEndContainer}>
                <Text style={GlobalStyles.listText}>{item.value}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <Modal transparent={true} visible={showModal}>
        <Animatable.View
          style={{ backgroundColor: "grey", flex: 1 }}
          animation="fadeIn"
          duration={300}
        >
          <View style={GlobalStyles.modalContainer}>
            <Text style={GlobalStyles.listText}>Hva er dette?</Text>
            <View style={[GlobalStyles.greyContainer, { height: "90%" }]}>
              <Text style={GlobalStyles.listText}>
                Tar du opp fag får du annet snitt, kanskje fler realfagspoeng
                osv idk
              </Text>
              <Text>
                {" "}
                For andre spørsmål gå til vår{" "}
                <Text
                  style={{ textDecorationLine: "underline" }}
                  onPress={() => {
                    setShowModal(false);
                    props.navigation.navigate("Questions");
                  }}
                >
                  FAQ
                </Text>{" "}
                side
              </Text>
            </View>
            <CustomBtn text="Ok" onclick={() => setShowModal(false)} />
          </View>
        </Animatable.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  poeng: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.blueColor.color,
  },
});

function mapStateToProps(state: any) {
  return {
    retakeTotalPoints: state.retakeTotalPoints,
    retakeAlderspoeng: state.retakeAlderspoeng,
    retakeExtraPoints: state.retakeExtraPoints,
    retakeRealfagspoeng: state.retakeRealfagspoeng,
    retakeSnitt: state.retakeSnitt,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    updateRetakeAlderspoeng: () =>
      dispatch({ type: "UPDATE_RETAKE_ALDERSPOENG", payload: null }),
    updateRetakeExtraPoints: () =>
      dispatch({ type: "UPDATE_RETAKE_EXTRA_POINTS", payload: null }),
    updateRetakeTotalPoints: () =>
      dispatch({ type: "UPDATE_RETAKE_TOTAL_POINTS", payload: null }),
    updateRetakeRealfagspoeng: () =>
      dispatch({ type: "UPDATE_RETAKE_REALFAGSPOENG", payload: null }),
    increaseRetakeAlderspoeng: (add: number) =>
      dispatch({ type: "INCREASE_RETAKE_ALDERSPOENG", payload: add }),
    increaseRetakeExtraPoints: (add: number) =>
      dispatch({ type: "INCREASE_RETAKE_EXTRA_POINTS", payload: add }),
    updateRetakeSnitt: () =>
      dispatch({ type: "UPDATE_RETAKE_SNITT", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RetakeGradeSummary);
