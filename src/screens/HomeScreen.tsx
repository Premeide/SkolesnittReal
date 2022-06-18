import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import CustomHeader from "../components/CustomHeader";
import GlobalStyles from "../assets/styles/GlobalStyles";
import CustomBtn from "../components/CustomBtn";
import GradeSummary from "../components/GradeSummary";
import { connect } from "react-redux";
import MyEducationsList from "../components/MyEducationsList";

interface IHomeScreen {
  navigation: any;
  route: any;
  tutorial: boolean;
  dontShowEducations?: boolean;
  tutorialDone: () => {};
}
class HomeScreen extends Component<IHomeScreen> {
  state = {
    dontShowEducations: this.props?.route?.params?.dontShowEducations,
  };

  skipHandler() {
    this.props.tutorialDone();
    this.props.navigation.navigate("Tab", { screen: "Hjem" });
  }
  render() {
    return (
      <View style={GlobalStyles.container}>
        <ScrollView>
          <CustomHeader />
          <GradeSummary />
          {this.state.dontShowEducations ? null : (
            <MyEducationsList navigation={this.props.navigation} />
          )}
        </ScrollView>
        {this.props.tutorial ? (
          <CustomBtn
            text="Legg til utdanning"
            onclick={() => this.props.navigation.navigate("Discover")}
            flexEndBtn={{
              text: "SKIP",
              onPress: () => this.skipHandler(),
            }}
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
  return {
    tutorialDone: () => dispatch({ type: "TUTORIAL_DONE", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
