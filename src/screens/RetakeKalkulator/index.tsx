// import React, { Component } from "react";
import AddOrDeleteBtn from "../../components/AddOrDeleteBtn";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import { IGrade } from "../../assets/data/Interfaces";
import { Modal, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import ElevatingSnitt from "../../components/ElevatingSnitt";
import { Component } from "react";
import RetakeGradesList from "../../components/RetakeGradesList";
import AddRetakeClass from "../../components/AddRetakeClass";

interface IRetakeKalkulatorScreen {
  navigation: any;
  route: any;

  retakeGrades: IGrade[];
  retakeSnitt: number;
}
class RetakeKalkulatorScreen extends Component<IRetakeKalkulatorScreen> {
  state = {
    isEditing: false,
    showModal: false,
    searchText: "",
  };

  toggleIsEditing = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <SafeAreaView style={GlobalStyles.container}>
        <ElevatingSnitt isRetake={true} />
        <RetakeGradesList isEditing={this.state.isEditing} />

        <Modal transparent={true} visible={this.state.showModal}>
          <AddRetakeClass
            hideModal={() => this.setState({ showModal: false })}
          />
        </Modal>

        <AddOrDeleteBtn
          toggleIsEditing={this.toggleIsEditing}
          toggleModal={this.toggleModal}
          isEditing={this.state.isEditing}
        />
      </SafeAreaView>
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
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetakeKalkulatorScreen);
