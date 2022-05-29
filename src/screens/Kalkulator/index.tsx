import React, { Component } from "react";
import AddOrDeleteBtn from "../../components/AddOrDeleteBtn";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import { GradesInterface } from "../../assets/data/Interfaces";
import { Modal, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import GradesList from "../../components/GradesList";
import AddClass from "../../components/AddClass";
import ElevatingSnitt from "../../components/ElevatingSnitt";

interface IKalkulatorScreen {
  navigation: any;
  route: any;
  tutorial: boolean;

  grades: GradesInterface[];
  snitt: number;
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
            height={"25%"}
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

// onclick={() =>
//   this.props.navigation.navigate("Tab", {
//     screen: "Hjem",
//     params: { showEducationBtn: true },
//   })
// }
// const forceUpdate = () => {
//   console.log("-- ForceUpdate -- ");
//   grades.length == 0 ? setGrades([]) : tabChange(grades[0]);
// };
{
  /* {localData.firstTime.Kalk ? (
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
        ) : null} */
}
// useEffect(() => {
//   setSnitt(snittCalculator(grades));
//   localData.grades = grades;
// }, [grades]);
// const tabDelete = useCallback((delGrade: GradesInterface) => {
//   setGrades((grades) =>
//     grades.filter((element) => element.id !== delGrade.id)
//   );
// }, []);
// const renderItem = ({ item }: { item: GradesInterface }) => (
//   <GradeItem
//     grade={item}
//     tabChange={tabChange}
//     tabDelete={tabDelete}
//     hadExamChange={hadExamChange}
//     translateX={translateX}
//   />
// );
// function snittCalculator(gradeList: any) {
//   let sum = 0;
//   let numOfClasses = 0;

//   for (const [i, e] of gradeList.entries()) {
//     sum += e.value + 1;
//     numOfClasses += 1;
//     if (e.includeExam) {
//       sum += e.examValue + 1;
//       numOfClasses += 1;
//     }
//   }
//   return ((sum * 10) / numOfClasses).toFixed(2);
// }
