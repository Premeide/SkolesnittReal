import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { GradesInterface } from "../assets/data/Interfaces";
import { allClasseslist } from "../assets/data/GlobalData";
import CustomBtn from "./CustomBtn";

interface AddClassProps {
  grades: GradesInterface[];
  addGrade: (id: string) => void;
  hideModal: () => void;
  deleteGrade: (id: string) => void;
}

class AddClass extends Component<AddClassProps> {
  initCheckArray = () => {
    let newCheckArray = this.props.grades.map((o) => o.id);
    return newCheckArray;
  };

  state = {
    searchText: "",
    checkArray: this.initCheckArray(),
  };

  searchFilter(s: string, l: any) {
    if (s == "") return l;
    return l.filter((v: any) => v.name.toLowerCase().includes(s));
  }

  updateSelectedGrades() {
    this.props.hideModal();
    for (const id of this.state.checkArray) {
      if (this.props.grades.find((o) => o.id === id) === undefined) {
        this.props.addGrade(id);
      }
    }
    for (const o of this.props.grades) {
      if (!this.state.checkArray.includes(o.id)) {
        this.props.deleteGrade(o.id);
      }
    }
  }

  changeCheckArray = (text: string) => {
    let newCheckArray = this.state.checkArray;
    if (this.state.checkArray.includes(text)) {
      newCheckArray = newCheckArray.filter((e: string) => e !== text);
    } else {
      newCheckArray.push(text);
    }
    this.setState({ checkArray: newCheckArray });
  };
  render() {
    return (
      <Animatable.View
        style={{ backgroundColor: "grey", flex: 1 }}
        animation="fadeIn"
        duration={300}
      >
        <View style={GlobalStyles.modalContainer}>
          <TextInput
            style={GlobalStyles.textInput2}
            placeholder="Søk fag"
            onChangeText={(text) => this.setState({ searchText: text })} // setSearchText(text)
          />
          <View style={[GlobalStyles.greyContainer, { height: "90%" }]}>
            <FlatList
              data={this.searchFilter(this.state.searchText, allClasseslist)}
              ItemSeparatorComponent={() => (
                <View style={GlobalStyles.ItemSeparatorComponent} />
              )}
              keyExtractor={(e) => e.name}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={GlobalStyles.row}
                  onPress={() => this.changeCheckArray(item.name)}
                >
                  <Text style={[GlobalStyles.listText, { width: "90%" }]}>
                    {item.name}
                  </Text>
                  <View style={GlobalStyles.listEndContainer}>
                    {this.state.checkArray.includes(item.name) ? (
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
          <CustomBtn
            text="Ferdig"
            onclick={() => this.updateSelectedGrades()}
          />
        </View>
      </Animatable.View>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddClass);
