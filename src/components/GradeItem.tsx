import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import SegmentedControl from "rn-segmented-control";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { GradesInterface } from "../assets/data/Interfaces";
import * as Animatable from "react-native-animatable";

interface GradeItemProps {
  grade: GradesInterface;
  tabChange: (grade: GradesInterface) => void;
  tabDelete: (grade: GradesInterface) => void;
  hadExamChange: (grade: GradesInterface) => void;
  translateX: any;
}
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEIGHT_CONTAINER = SCREEN_HEIGHT * 0.18;
const HEIGHT_CONTAINER_INCLUDING_EXAM = SCREEN_HEIGHT * 0.28;
const GRADE_TABS = ["1", "2", "3", "4", "5", "6"];

const GradeItem: React.FC<GradeItemProps> = ({
  grade,
  tabChange,
  tabDelete,
  hadExamChange,
  translateX,
}) => {
  const examContainerOpacity = useSharedValue(grade.exam ? 1 : 0);
  const translateXContainer = useSharedValue(0);
  const heightContainer = useSharedValue(
    grade.exam ? HEIGHT_CONTAINER_INCLUDING_EXAM : HEIGHT_CONTAINER
  );

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
      runOnJS(tabChange)({
        id: grade.id,
        value: grade.value,
        exam: grade.exam,
        exva: index,
      });
    } else {
      runOnJS(tabChange)({
        id: grade.id,
        value: index,
        exam: grade.exam,
        exva: grade.exva,
      });
    }
  };
  const tabDeleteHandler = () => {
    heightContainer.value = withTiming(0, undefined);
    translateXContainer.value = withTiming(
      SCREEN_WIDTH,
      undefined,
      (isFinished) => {
        if (isFinished) {
          runOnJS(tabDelete)(grade);
        }
      }
    );
  };
  const hadExamChangeHandler = () => {
    if (grade.exam) {
      examContainerOpacity.value = withTiming(0, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(hadExamChange)(grade);
          heightContainer.value = withTiming(HEIGHT_CONTAINER);
        }
      });
    } else {
      heightContainer.value = withTiming(
        HEIGHT_CONTAINER_INCLUDING_EXAM,
        undefined,
        (isFinished) => {
          if (isFinished) {
            runOnJS(hadExamChange)(grade);
            examContainerOpacity.value = withDelay(200, withTiming(1));
          }
        }
      );
    }
  };
  return (
    <Animated.View style={[styles.gradeContainer, rStyleContainer]}>
      <Animated.View style={styles.iconContainer}>
        <TouchableOpacity onPress={tabDeleteHandler}>
          <FontAwesome5 name={"trash-alt"} size={30} color="red" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.grade, rStyle]}>
        <Text style={styles.gradeName}>{grade.id}</Text>
        <SegmentedControl
          tabs={GRADE_TABS}
          currentIndex={grade.value}
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
            <Text style={styles.hadExamText}>{grade.exam ? "Nei" : "Ja"}</Text>
          </TouchableOpacity>
        </View>
        {grade.exam ? (
          <Animated.View style={rStyleExamContainer}>
            <Text style={styles.gradeName}>{grade.id} [EKSAMEN]</Text>
            <SegmentedControl
              paddingVertical={5}
              tabs={GRADE_TABS}
              currentIndex={grade.exva}
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

export default GradeItem;
