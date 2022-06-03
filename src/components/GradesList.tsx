import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { IGrade } from "../assets/data/Interfaces";
import GradeItem from "./GradeItem";

interface GradesListProps {
  grades: IGrade[];
  isEditing: boolean;
  addGrade: (id: string) => void;
  deleteGrade: (id: string) => void;
  changeHadExam: (grade: IGrade) => void;
  changeGrade: (grade: IGrade) => void;
}

class GradesList extends Component<GradesListProps> {
  state = {};

  render() {
    return (
      <View>
        <FlatList
          data={this.props.grades}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={6}
          ListFooterComponent={() => <Text style={{ fontSize: 65 }}> </Text>}
          ListHeaderComponent={() => <Text style={{ fontSize: 60 }}> </Text>}
          keyExtractor={(e) => e.id}
          renderItem={({ item }) => (
            <View>
              <GradeItem
                grade={item}
                tabChange={this.props.changeGrade}
                tabDelete={this.props.deleteGrade}
                hadExamChange={this.props.changeHadExam}
                isEditing={this.props.isEditing}
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
    grades: state.grades,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    addGrade: (id: string) => dispatch({ type: "ADD_GRADE", payload: id }),
    deleteGrade: (id: string) =>
      dispatch({ type: "DELETE_GRADE", payload: id }),
    changeHadExam: (grade: IGrade) =>
      dispatch({ type: "CHANGE_HAD_EXAM", payload: grade }),
    changeGrade: (grade: IGrade) =>
      dispatch({ type: "CHANGE_GRADE", payload: grade }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GradesList);
