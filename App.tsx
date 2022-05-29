import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GradesInterface, IExtraPoints } from "./src/assets/data/Interfaces";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./src/navigation/Router";

const DEFAULT_GRADE = { id: "-", value: 0, includeExam: false, examValue: 0 };

const initialState = {
  tutorial: true,
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
    { value: 0, id: "Geografi", includeExam: true, examValue: 0 },
    // { value: 0, id: "Historie", includeExam: true, examValue: 0 },
    // { value: 0, id: "Naturfag", includeExam: false, examValue: 0 },
    // { value: 0, id: "Kroppsøving", includeExam: false, examValue: 0 },
    // { value: 0, id: "Matematikk 1T/1P", includeExam: false, examValue: 0 },
    // { value: 0, id: "Matematikk 2T/2P", includeExam: false, examValue: 0 },
    // { value: 0, id: "Norsk hovedmål", includeExam: false, examValue: 0 },
    // { value: 0, id: "Norsk muntlig", includeExam: false, examValue: 0 },
    // { value: 0, id: "Norsk sidemål", includeExam: false, examValue: 0 },
    // { value: 0, id: "Religion og etikk", includeExam: false, examValue: 0 },
    // { value: 0, id: "Samfunnsfag", includeExam: false, examValue: 0 },
  ],
  retakeGrades: [],
  educations: [0],

  snitt: 70.0,
  realfagspoeng: 100,

  retakeSnitt: 70.0,
  retakeRealfagspoeng: 100,
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
    case "ADD_GRADE":
      return { ...state, grades: addGrade(state.grades, action.payload) };
    case "DELETE_GRADE":
      return { ...state, grades: deleteGrade(state.grades, action.payload) };
    case "CHANGE_GRADE":
      return {
        ...state,
        grades: changeGrade(state.grades, action.payload),
      };
    case "CHANGE_HAD_EXAM":
      return { ...state, grades: changeHadExam(state.grades, action.payload) };
    case "UPDATE_SNITT":
      return { ...state, snitt: snitt(state.grades) };
    case "TUTORIAL_DONE":
      return { ...state, tutorial: false };
    default:
      return state;
  }
};

const store = createStore(reducer);

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
function changeHadExam(grades: GradesInterface[], grade: GradesInterface) {
  let newGrades = [...grades];
  newGrades[newGrades.findIndex((e) => e.id === grade.id)] = {
    ...grade,
    includeExam: !grade.includeExam,
  };
  return newGrades;
}
function snitt(grades: GradesInterface[]) {
  const initialVals = { avg: 0, n: 0 };
  const averageGrade = grades.reduce(averageScores, initialVals);

  return (averageGrade.avg + 1) * 10;
}

function averageScores({ avg, n }: any, o: GradesInterface) {
  // helper function
  if (o.includeExam) {
    const newVals = averageScoresExam({ avg, n }, o);
    return {
      avg: (o.value + (n + 1) * newVals.avg) / (n + 2),
      n: n + 2,
    };
  }
  return {
    avg: (o.value + n * avg) / (n + 1),
    n: n + 1,
  };
}
function averageScoresExam({ avg, n }: any, o: GradesInterface) {
  // helper function
  return {
    avg: (o.examValue + n * avg) / (n + 1),
    n: n + 1,
  };
}
function addGrade(grades: GradesInterface[], id: string) {
  if (grades.find((e) => e.id === id)) return grades; //deleteGrade(grades, id);
  let newGrade = DEFAULT_GRADE;
  newGrade = { ...newGrade, id: id };

  let newGrades = [...grades, newGrade];
  return newGrades;
}

function deleteGrade(grades: GradesInterface[], id: string) {
  let newGrades = [...grades];
  newGrades = newGrades.filter((e) => e.id !== id);
  return newGrades;
}

function changeGrade(grades: GradesInterface[], grade: GradesInterface) {
  let newGrades = [...grades];
  newGrades[newGrades.findIndex((e) => e.id === grade.id)] = {
    ...grade,
    value: grade.value,
    examValue: grade.examValue,
  };
  return newGrades;
}

function setEducations(educations: number[], studiekode: number) {
  if (educations.includes(studiekode)) {
    educations = educations.filter((o) => o != studiekode);
  } else {
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
