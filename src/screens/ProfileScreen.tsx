import React, { Component } from "react";
import { View } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import ExtraPoints from "../components/ExtraPoints";
import AgeInput from "../components/AgeInput";
import { connect } from "react-redux";
import ProfileList from "../components/ProfileList";

interface IProfileScreen {
  navigation: any;
}
class ProfileScreen extends Component<IProfileScreen> {
  render() {
    return (
      <View style={GlobalStyles.container}>
        <AgeInput />
        <ExtraPoints />
        <ProfileList navigation={this.props.navigation} />
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
