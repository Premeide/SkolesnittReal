import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./src/navigation/Router";

interface IExtraPoints {
  value: number;
  Military: boolean;
  Folkehøyskole: boolean;
  _30points: boolean;
  _60points: boolean;
}

const initialState = {
  yearOfBirth: "",
  extraPoints: {
    value: 0,
    Military: false,
    Folkehøyskole: false,
    _30points: false,
    _60points: false,
  },
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_YEAR_OF_BIRTH":
      return { ...state, yearOfBirth: action.payload };
    case "SET_EXTRA_POINTS":
      return {
        ...state,
        extraPoints: calculateExtraPoints(state.extraPoints, action.payload),
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

function calculateExtraPoints(extraPoints: IExtraPoints, clicked: string) {
  switch (clicked) {
    case "Folkehøyskole":
      extraPoints = {
        ...extraPoints,
        Folkehøyskole: !extraPoints.Folkehøyskole,
      };
      break;
    case "Militæret":
      extraPoints = {
        ...extraPoints,
        Military: !extraPoints.Military,
      };
      break;
    case "30 til 59 studiepoeng":
      extraPoints = {
        ...extraPoints,
        _30points: !extraPoints._30points,
      };
      break;
    case "60 studiepoeng":
      extraPoints = {
        ...extraPoints,
        _60points: !extraPoints._60points,
      };
      break;
    case "Ingen av disse":
      extraPoints = {
        value: 0,
        Military: false,
        Folkehøyskole: false,
        _30points: false,
        _60points: false,
      };
      break;
  }
  var newValue = 0;
  if (extraPoints._30points) newValue = 1;
  if (
    extraPoints.Folkehøyskole ||
    extraPoints.Military ||
    extraPoints._60points
  ) {
    newValue = 2;
  }
  extraPoints = { ...extraPoints, value: newValue };
  return extraPoints;
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;
