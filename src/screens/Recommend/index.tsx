import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomHeader from "../../components/CustomHeader";
import RetakeClassesList from "../../components/RetakeClassesList";
import RetakeGradeSummary from "../../components/RetakeGradeSummary";
interface IRecommendScreen {
  navigation: any;
}
class RecommendScreen extends Component<IRecommendScreen> {
  render() {
    return (
      <View style={GlobalStyles.safeContainer}>
        <CustomHeader />
        <RetakeGradeSummary />
        <RetakeClassesList navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default RecommendScreen;
