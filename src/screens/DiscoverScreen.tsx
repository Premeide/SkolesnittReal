import React, { Component } from "react";
import { View } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import EducationList from "../components/EducationList";
interface IDiscoverScreen {
  navigation: any;
}
class DiscoverScreen extends Component<IDiscoverScreen> {
  render() {
    return (
      <View style={GlobalStyles.container}>
        <EducationList navigation={this.props.navigation} />
      </View>
    );
  }
}

export default DiscoverScreen;
