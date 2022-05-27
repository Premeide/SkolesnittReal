import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { IExtraPoints } from "./src/assets/data/Interfaces";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./src/navigation/Router";

const initialState = {
  yearOfBirth: "",
  extraPoints: {
    value: 0,
    Military: false,
    Folkehøyskole: false,
    _30points: false,
    _60points: false,
  },
  grades: [
    { value: 0, id: "Engelsk", includeExam: false, examValue: 0 },
    { value: 0, id: "Fremmedspråk", includeExam: false, examValue: 0 },
    { value: 0, id: "Geografi", includeExam: false, examValue: 0 },
    { value: 0, id: "Historie", includeExam: false, examValue: 0 },
    { value: 0, id: "Naturfag", includeExam: false, examValue: 0 },
    { value: 0, id: "Kroppsøving", includeExam: false, examValue: 0 },
    { value: 0, id: "Matematikk 1T/1P", includeExam: false, examValue: 0 },
    { value: 0, id: "Matematikk 2T/2P", includeExam: false, examValue: 0 },
    { value: 0, id: "Norsk hovedmål", includeExam: false, examValue: 0 },
    { value: 0, id: "Norsk muntlig", includeExam: false, examValue: 0 },
    { value: 0, id: "Norsk sidemål", includeExam: false, examValue: 0 },
    { value: 0, id: "Religion og etikk", includeExam: false, examValue: 0 },
    { value: 0, id: "Samfunnsfag", includeExam: false, examValue: 0 },
  ],
  snitt: 60.0,
  retakeGrades: [],
  educations: [0, 150140],
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
    case "SET_EDUCATIONS":
      return {
        ...state,
        educations: setEducations(state.educations, action.payload),
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

function setEducations(educations: number[], studiekode: number) {
  if (educations.includes(studiekode)) {
    console.log("removing");
    educations = educations.filter((o) => o != studiekode);
  } else {
    console.log("ADDING");
    educations.push(studiekode);
  }
  return educations;
}
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
