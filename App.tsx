import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GradesInterface, IExtraPoints } from "./src/assets/data/Interfaces";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./src/navigation/Router";
import { allClasseslist } from "./src/assets/data/GlobalData";

const DEFAULT_GRADE = { id: "-", value: 0, includeExam: false, examValue: 0 };
const YEAR_WITH_NO_ALDERSPOENG = 2003; // År 2021: 2002, 2022:2003

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
    { value: 0, id: "Historie", includeExam: true, examValue: 0 },
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
  retakeGrades: [],
  educations: [0],

  snitt: 70.0,
  retakeSnitt: 70.0,

  realfagspoeng: 100,
  retakeRealfagspoeng: 100,

  totalPoints: 100,
  totalPoints235: 100,

  alderspoeng: 100,
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
    case "UPDATE_ALDERSPOENG":
      return { ...state, alderspoeng: alderspoeng(state.yearOfBirth) };
    case "UPDATE_TOTAL_POINTS":
      return {
        ...state,
        totalPoints: totalPoints(
          state.snitt,
          state.alderspoeng,
          state.extraPoints.value,
          state.realfagspoeng
        ),
      };
    case "UPDATE_REALFAGSPOENG":
      return { ...state, realfagspoeng: realfagspoeng(state.grades) };
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

function totalPoints(
  snitt: number,
  alderspoeng: number,
  tilleggspoeng: number,
  realfagspoeng: number
) {
  let newTotalPoints = 0;
  newTotalPoints += snitt + alderspoeng + tilleggspoeng + realfagspoeng;
  return newTotalPoints;
}
function realfagspoeng(grades: GradesInterface[]) {
  let realfagspoeng = 0;
  for (const grade of grades) {
    let thisGradeRealfagspoeng = allClasseslist.find(
      (o) => o.name === grade.id
    )?.rPoints;
    if (thisGradeRealfagspoeng) realfagspoeng += thisGradeRealfagspoeng;
  }
  return realfagspoeng; //Math.min(realfagspoeng, 4);
}
function alderspoeng(yearOfBirth: string, _235: boolean = false) {
  let fødselsår = isPositiveInteger(yearOfBirth) ? Number(yearOfBirth) : 2020;
  let alderspoeng =
    ((_235 ? YEAR_WITH_NO_ALDERSPOENG - 4 : YEAR_WITH_NO_ALDERSPOENG) -
      fødselsår) *
    2;
  alderspoeng = Math.min(Math.max(alderspoeng, 0), 8);
  return alderspoeng;
}
function isPositiveInteger(str: string) {
  //helper function
  if (typeof str !== "string") {
    return false;
  }
  const num = Number(str);
  if (Number.isInteger(num) && num > 0) {
    return true;
  }
  return false;
}
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
