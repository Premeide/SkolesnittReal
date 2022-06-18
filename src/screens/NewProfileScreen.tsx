import React, { Component } from "react";
import { View } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import ArrowBtn from "../components/ArrowBtn";
import { connect } from "react-redux";
import ExtraPoints from "../components/ExtraPoints";
import AgeInput from "../components/AgeInput";

interface INewProfileProps {
  navigation: any;
}

class NewProfileScreen extends Component<INewProfileProps> {
  state = {
    showPoints: false,
  };

  setInputFocus = (text: string) => {
    if (text.length >= 4) this.setState({ showPoints: true });
  };
  navigateToKalkulator = () => {
    this.props.navigation.navigate("_Kalkulator", {
      showContinueBtn: true,
    });
  };

  render() {
    return (
      <View style={GlobalStyles.container}>
        <AgeInput setInputFocus={this.setInputFocus} />
        {this.state.showPoints ? <ExtraPoints /> : null}

        {this.state.showPoints ? (
          <ArrowBtn onclick={this.navigateToKalkulator} />
        ) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(NewProfileScreen);
