import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import ArrowButton from "../../components/ArrowButton";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";

const INGEN_AV_DISSE = "Ingen av disse";
let newProfileData = [
  { name: "Folkehøyskole" },
  { name: "Militæret" },
  { name: "30 til 59 studiepoeng" },
  { name: "60 studiepoeng" },
  { name: INGEN_AV_DISSE },
];

interface INewProfileProps {
  yearOfBirth: string;
  extraPoints: {
    value: Int8Array;
    Military: boolean;
    Folkehøyskole: boolean;
    _30points: boolean;
    _60points: boolean;
  };
  navigation: any;
  setYearOfBirth: (text: string) => {};
  setExtraPoints: (text: string) => {};
}

class NewProfileScreen extends Component<INewProfileProps> {
  state = {
    showPoints: false,
    checkArray: [""],
  };

  setInputFocus = (text: string) => {
    if (text.length >= 4) {
      this.setState({ showPoints: true });
    }
  };
  changeCheckArray = (text: string) => {
    let newCheckArray = this.state.checkArray;
    if (this.state.checkArray.includes(text)) {
      newCheckArray = newCheckArray.filter((e: string) => e !== text);
      console.log("here");
    } else if (text == INGEN_AV_DISSE) {
      newCheckArray = [INGEN_AV_DISSE];
    } else {
      newCheckArray.push(text);
    }
    this.setState({ checkArray: newCheckArray });
  };

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Animatable.View
          style={GlobalStyles.whiteContainer}
          animation="fadeInUp"
          duration={700}
        >
          <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
          <TextInput
            value={this.props.yearOfBirth}
            // ref={ageInputRef}
            maxLength={4}
            keyboardType="number-pad"
            placeholder="2022"
            style={GlobalStyles.textInput}
            onChangeText={(text) => {
              this.props.setYearOfBirth(text);
              this.setInputFocus(text);
            }}
          />
        </Animatable.View>

        {this.state.showPoints ? (
          <Animatable.View
            style={GlobalStyles.whiteContainer}
            animation="fadeInUp"
            duration={700}
          >
            <Text style={GlobalStyles.underTitleText}>
              Tilleggspoeng: {this.props.extraPoints.value}
              {this.state.showPoints}
            </Text>
            <View style={GlobalStyles.greyContainer}>
              <FlatList
                data={newProfileData}
                keyExtractor={(item) => item.name}
                ItemSeparatorComponent={() => (
                  <View style={GlobalStyles.ItemSeparatorComponent} />
                )}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={GlobalStyles.row}
                    onPress={() => {
                      this.props.setExtraPoints(item.name);
                      this.changeCheckArray(item.name);
                    }}
                  >
                    <Text style={GlobalStyles.listText}>{item.name}</Text>
                    {item.name == INGEN_AV_DISSE ? null : (
                      <View style={GlobalStyles.listEndContainer}>
                        {this.state.checkArray.includes(item.name) ? (
                          <FontAwesome5
                            name={"check-circle"}
                            size={25}
                            color="black"
                          />
                        ) : (
                          <FontAwesome5
                            name={"circle"}
                            size={25}
                            color="black"
                          />
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </Animatable.View>
        ) : null}

        {this.state.showPoints ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("_Kalkulator");
            }}
            style={GlobalStyles.customBtnContainer}
          >
            <ArrowButton />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    yearOfBirth: state.yearOfBirth,
    extraPoints: state.extraPoints,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    setYearOfBirth: (text: string) =>
      dispatch({ type: "SET_YEAR_OF_BIRTH", payload: text }),
    setExtraPoints: (text: string) =>
      dispatch({ type: "SET_EXTRA_POINTS", payload: text }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProfileScreen);
