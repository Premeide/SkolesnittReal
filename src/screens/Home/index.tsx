import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import GradeSummary from "../../components/GradeSummary";
import { connect } from "react-redux";

interface IHomeScreen {
  navigation: any;
  route: any;
  tutorial: boolean;
}
class HomeScreen extends Component<IHomeScreen> {
  render() {
    return (
      <View style={GlobalStyles.container}>
        <CustomHeader />
        <GradeSummary />
        {this.props.tutorial ? (
          <CustomBtn
            text="Legg til utdanning"
            onclick={() => this.props.navigation.navigate("Discover")}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    tutorial: state.tutorial,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

{
  /* <ScrollView>  <FlatList nestedScrollEnabled /> */
}

{
  /* {localData.firstTime.logIn ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Discover")}
            style={[GlobalStyles.customBtnContainer, { position: "relative" }]}
          >
            <Animatable.View
              animation="fadeInUp"
              duration={700}
              delay={1000}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <CustomBtn text="Legg til utdanning" />
            </Animatable.View>
          </TouchableOpacity>
        ) : null} */
}