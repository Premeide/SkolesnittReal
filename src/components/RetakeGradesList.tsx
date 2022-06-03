import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { IGrade } from "../assets/data/Interfaces";
import GradeItem from "./GradeItem";

interface RetakeGradesListProps {
  retakeGrades: IGrade[];
  isEditing: boolean;
  addRetakeGrade: (id: string) => void;
  deleteRetakeGrade: (id: string) => void;
  changeRetakeHadExam: (grade: IGrade) => void;
  changeRetakeGrade: (grade: IGrade) => void;
}

class RetakeGradesList extends Component<RetakeGradesListProps> {
  state = {};

  render() {
    return (
      <View>
        <FlatList
          data={this.props.retakeGrades}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={6}
          ListFooterComponent={() => <Text style={{ fontSize: 65 }}> </Text>}
          ListHeaderComponent={() => <Text style={{ fontSize: 60 }}> </Text>}
          keyExtractor={(e) => e.id}
          renderItem={({ item }) => (
            <View>
              <GradeItem
                grade={item}
                tabChange={this.props.changeRetakeGrade}
                tabDelete={this.props.deleteRetakeGrade}
                hadExamChange={this.props.changeRetakeHadExam}
                isEditing={this.props.isEditing}
                isRetake={true}
              />
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    retakeGrades: state.retakeGrades,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    addRetakeGrade: (id: string) =>
      dispatch({ type: "ADD_RETAKE_GRADE", payload: id }),
    deleteRetakeGrade: (id: string) =>
      dispatch({ type: "DELETE_RETAKE_GRADE", payload: id }),
    changeRetakeHadExam: (grade: IGrade) =>
      dispatch({ type: "CHANGE_RETAKE_HAD_EXAM", payload: grade }),
    changeRetakeGrade: (grade: IGrade) =>
      dispatch({ type: "CHANGE_RETAKE_GRADE", payload: grade }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RetakeGradesList);
