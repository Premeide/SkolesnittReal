import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import SegmentedControl from "rn-segmented-control";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { IGrade } from "../assets/data/Interfaces";
import { connect } from "react-redux";

interface GradeItemProps {
  grade: IGrade;
  tabChange: (grade: IGrade) => void;
  tabDelete: (id: string) => void;
  hadExamChange: (grade: IGrade) => void;
  isEditing: boolean;
  updateSnitt: () => void;
  updateRetakeSnitt: () => void;
  isRetake?: boolean;
}
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEIGHT_CONTAINER = SCREEN_HEIGHT * 0.18;
const HEIGHT_CONTAINER_INCLUDING_EXAM = SCREEN_HEIGHT * 0.28;
const GRADE_TABS = ["1", "2", "3", "4", "5", "6"];

const GradeItem: React.FC<GradeItemProps> = (props) => {
  const [, updateState] = React.useState(false);
  const forceUpdate = React.useCallback(() => updateState((v) => !v), []);

  const examContainerOpacity = useSharedValue(props.grade.includeExam ? 1 : 0);
  const translateXContainer = useSharedValue(0);
  const translateX = useSharedValue(0);
  const heightContainer = useSharedValue(
    props.grade.includeExam ? HEIGHT_CONTAINER_INCLUDING_EXAM : HEIGHT_CONTAINER
  );
  // useEffect(() => {
  //   props.isEditing
  //     ? (translateX.value = withSpring(100))
  //     : (translateX.value = withSpring(0));
  // }, [props.isEditing]);
  useEffect(() => {
    if (props.isRetake) {
      props.updateRetakeSnitt();
    } else {
      props.updateSnitt();
    }
  }, [props.grade]);

  const rStyleContainer = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXContainer.value }],
    height: heightContainer.value,
  }));
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    height: heightContainer.value * 0.9,
  }));
  const rStyleExamContainer = useAnimatedStyle(() => ({
    opacity: examContainerOpacity.value,
  }));

  const tabChangeHandler = (index: number, isExam: boolean = false) => {
    if (isExam) {
      runOnJS(props.tabChange)({
        id: props.grade.id,
        value: props.grade.value,
        includeExam: props.grade.includeExam,
        examValue: index,
      });
    } else {
      runOnJS(props.tabChange)({
        id: props.grade.id,
        value: index,
        includeExam: props.grade.includeExam,
        examValue: props.grade.examValue,
      });
    }
    forceUpdate();
  };
  const tabDeleteHandler = () => {
    heightContainer.value = withTiming(0, undefined);
    translateXContainer.value = withTiming(
      SCREEN_WIDTH,
      undefined,
      (isFinished) => {
        if (isFinished) {
          runOnJS(props.tabDelete)(props.grade.id);
        }
      }
    );
  };
  const hadExamChangeHandler = () => {
    if (props.grade.includeExam) {
      examContainerOpacity.value = withTiming(0, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(props.hadExamChange)(props.grade);
          heightContainer.value = withTiming(HEIGHT_CONTAINER);
        }
      });
    } else {
      heightContainer.value = withTiming(
        HEIGHT_CONTAINER_INCLUDING_EXAM,
        undefined,
        (isFinished) => {
          if (isFinished) {
            runOnJS(props.hadExamChange)(props.grade);
            examContainerOpacity.value = withDelay(100, withTiming(1));
          }
        }
      );
    }
    forceUpdate();
  };
  return (
    <Animated.View style={[styles.gradeContainer, rStyleContainer]}>
      <Animated.View style={styles.iconContainer}>
        <TouchableOpacity onPress={tabDeleteHandler}>
          <FontAwesome5 name={"trash-alt"} size={30} color="red" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.grade, rStyle]}>
        <View style={GlobalStyles.row}>
          <Text style={styles.gradeName}>{props.grade.id}</Text>
          <View style={GlobalStyles.listEndContainer}>
            <TouchableOpacity onPress={tabDeleteHandler} style={{ padding: 3 }}>
              <FontAwesome5 name={"trash-alt"} size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <SegmentedControl
          tabs={GRADE_TABS}
          currentIndex={props.grade.value}
          onChange={(index) => tabChangeHandler(index)}
          paddingVertical={5}
          segmentedControlBackgroundColor="gainsboro"
          activeSegmentBackgroundColor={GlobalStyles.blueColor.color}
          activeTextColor="white"
          textColor="black"
          activeTextWeight="bold"
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "grey" }}>Hatt eksamen? </Text>
          <TouchableOpacity onPress={hadExamChangeHandler}>
            <Text style={styles.hadExamText}>
              {props.grade.includeExam ? "Nei" : "Ja"}
            </Text>
          </TouchableOpacity>
        </View>
        {props.grade.includeExam ? (
          <Animated.View style={rStyleExamContainer}>
            <Text style={styles.gradeName}>{props.grade.id} [EKSAMEN]</Text>
            <SegmentedControl
              paddingVertical={5}
              tabs={GRADE_TABS}
              currentIndex={props.grade.examValue}
              onChange={(index) => tabChangeHandler(index, true)}
              segmentedControlBackgroundColor="gainsboro"
              activeSegmentBackgroundColor={GlobalStyles.blueColor.color}
              activeTextColor="white"
              textColor="black"
              activeTextWeight="bold"
            />
          </Animated.View>
        ) : null}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gradeContainer: {
    //width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  grade: {
    width: "100%",
    padding: 15,
    backgroundColor: GlobalStyles.whiteContainer.backgroundColor,
    borderRadius: GlobalStyles.whiteContainer.borderRadius,
  },
  gradeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 35,
  },
  hadExamText: {
    color: "black",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {
    // setYearOfBirth: (text: string) =>
    //   dispatch({ type: "SET_YEAR_OF_BIRTH", payload: text }),
    updateSnitt: () => dispatch({ type: "UPDATE_SNITT", payload: null }),
    updateRetakeSnitt: () =>
      dispatch({ type: "UPDATE_RETAKE_SNITT", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GradeItem);
