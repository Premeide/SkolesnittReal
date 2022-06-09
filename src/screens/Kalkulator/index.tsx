import React, { Component } from "react";
import AddOrDeleteBtn from "../../components/AddOrDeleteBtn";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import { IGrade } from "../../assets/data/Interfaces";
import { Modal, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import GradesList from "../../components/GradesList";
import AddClass from "../../components/AddClass";
import ElevatingSnitt from "../../components/ElevatingSnitt";

interface IKalkulatorScreen {
  navigation: any;
  route: any;
  tutorial: boolean;

  grades: IGrade[];
}
class KalkulatorScreen extends Component<IKalkulatorScreen> {
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
        <ElevatingSnitt />
        <GradesList isEditing={this.state.isEditing} />

        <Modal transparent={true} visible={this.state.showModal}>
          <AddClass hideModal={() => this.setState({ showModal: false })} />
        </Modal>

        <AddOrDeleteBtn
          toggleIsEditing={this.toggleIsEditing}
          toggleModal={this.toggleModal}
          isEditing={this.state.isEditing}
        />
        {this.props.tutorial ? (
          <CustomBtn
            text="Fortsett"
            height={"12%"}
            onclick={() =>
              this.props.navigation.navigate("Tab", {
                screen: "Hjem",
              })
            }
          />
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    grades: state.grades,
    tutorial: state.tutorial,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(KalkulatorScreen);
