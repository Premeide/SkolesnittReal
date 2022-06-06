import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  IGrade,
  IExtraPoints,
  IInitialState,
} from "./src/assets/data/Interfaces";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./src/navigation/Router";
import { ALL_CLASSES_LIST } from "./src/assets/data/GlobalData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const DEFAULT_GRADE = { id: "-", value: 0, includeExam: false, examValue: 0 };

const YEAR_WITH_NO_ALDERSPOENG = 2003; // År 2021: 2002, 2022:2003

const INITIAL_GRADES = [
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
];

const initialState: IInitialState = {
  tutorial: true,
  yearOfBirth: "",
  grades: INITIAL_GRADES,
  retakeGrades: [{ value: 6, id: "Engelsk", includeExam: false, examValue: 0 }],
  educations: [],

  //current grades summary
  totalPoints: 100,
  alderspoeng: 100,
  extraPoints: {
    value: 0,
    Military: false,
    Folkehøyskole: false,
    _30points: false,
    _60points: false,
  },
  realfagspoeng: 100,
  snitt: 70.0,

  //retake grades summary
  retakeTotalPoints: 100,
  retakeAlderspoeng: 0,
  retakeExtraPoints: 0,
  retakeRealfagspoeng: 100,
  retakeSnitt: 70.0,
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "RESET_ALL_STATES":
      return { ...initialState };
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
    case "UPDATE_RETAKE_SNITT":
      return {
        ...state,
        retakeSnitt: retakeSnitt(state.grades, state.retakeGrades),
      };
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
    case "UPDATE_RETAKE_ALDERSPOENG":
      return {
        ...state,
        retakeAlderspoeng: updateRetakeAlderspoeng(
          state.alderspoeng,
          state.retakeAlderspoeng
        ),
      };
    case "UPDATE_RETAKE_EXTRA_POINTS":
      return {
        ...state,
        retakeExtraPoints: updateRetakeExtraPoints(
          state.extraPoints.value,
          state.retakeExtraPoints
        ),
      };
    case "UPDATE_RETAKE_TOTAL_POINTS":
      return {
        ...state,
        retakeTotalPoints: updateRetakeTotalPoints(
          state.retakeSnitt,
          state.retakeAlderspoeng,
          state.retakeExtraPoints,
          state.retakeRealfagspoeng
        ),
      };
    case "UPDATE_RETAKE_REALFAGSPOENG":
      return {
        ...state,
        retakeRealfagspoeng: updateRetakeRealfagspoeng(
          state.grades,
          state.retakeGrades
        ),
      };

    case "INCREASE_RETAKE_ALDERSPOENG":
      return {
        ...state,
        retakeAlderspoeng: increaseRetakeAlderspoeng(
          state.retakeAlderspoeng,
          action.payload
        ),
      };
    case "INCREASE_RETAKE_EXTRA_POINTS":
      return {
        ...state,
        retakeExtraPoints: increaseRetakeExtraPoints(
          state.retakeExtraPoints,
          action.payload
        ),
      };
    case "ADD_RETAKE_GRADE":
      return {
        ...state,
        retakeGrades: addRetakeGrade(state.retakeGrades, action.payload),
      };
    case "DELETE_RETAKE_GRADE":
      return {
        ...state,
        retakeGrades: deleteRetakeGrade(state.retakeGrades, action.payload),
      };
    case "CHANGE_RETAKE_HAD_EXAM":
      return {
        ...state,
        retakeGrades: changeRetakeHadExam(state.retakeGrades, action.payload),
      };
    case "CHANGE_RETAKE_GRADE":
      return {
        ...state,
        retakeGrades: changeRetakeGrade(state.retakeGrades, action.payload),
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
// const store = createStore(reducer); //

const persistor = persistStore(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;

function addGrade(grades: IGrade[], id: string) {
  if (grades.find((e) => e.id === id)) return grades; //deleteGrade(grades, id);
  let newGrade = DEFAULT_GRADE;
  newGrade = { ...newGrade, id: id };

  let newGrades = [...grades, newGrade];
  return newGrades;
}

function deleteGrade(grades: IGrade[], id: string) {
  let newGrades = [...grades];
  newGrades = newGrades.filter((e) => e.id !== id);
  return newGrades;
}

function changeGrade(grades: IGrade[], grade: IGrade) {
  let newGrades = [...grades];
  newGrades[newGrades.findIndex((e) => e.id === grade.id)] = {
    ...grade,
    value: grade.value,
    examValue: grade.examValue,
  };
  return newGrades;
}
function changeHadExam(grades: IGrade[], grade: IGrade) {
  let newGrades = [...grades];
  newGrades[newGrades.findIndex((e) => e.id === grade.id)] = {
    ...grade,
    includeExam: !grade.includeExam,
  };
  return newGrades;
}
function addRetakeGrade(retakeGrades: IGrade[], id: string) {
  if (retakeGrades.find((e) => e.id === id)) return retakeGrades; //deleteGrade(grades, id);
  let newGrade = DEFAULT_GRADE;
  newGrade = { ...newGrade, id: id };

  let newGrades = [...retakeGrades, newGrade];
  return newGrades;
}

function deleteRetakeGrade(retakeGrades: IGrade[], id: string) {
  let newGrades = [...retakeGrades];
  newGrades = newGrades.filter((e) => e.id !== id);
  return newGrades;
}

function changeRetakeHadExam(retakeGrades: IGrade[], grade: IGrade) {
  let newGrades = [...retakeGrades];
  newGrades[newGrades.findIndex((e) => e.id === grade.id)] = {
    ...grade,
    includeExam: !grade.includeExam,
  };
  return newGrades;
}
function changeRetakeGrade(retakeGrades: IGrade[], grade: IGrade) {
  let newGrades = [...retakeGrades];
  newGrades[newGrades.findIndex((e) => e.id === grade.id)] = {
    ...grade,
    value: grade.value,
    examValue: grade.examValue,
  };
  return newGrades;
}

function updateRetakeAlderspoeng(
  alderspoeng: number,
  retakeAlderspoeng: number
) {
  return Math.max(alderspoeng, retakeAlderspoeng);
}
function updateRetakeExtraPoints(
  extraPoints: number,
  retakeExtraPoints: number
) {
  return Math.max(extraPoints, retakeExtraPoints);
}

function updateRetakeTotalPoints(
  retakeSnitt: number,
  retakeAlderspoeng: number,
  retakeTilleggspoeng: number,
  retakeRealfagspoeng: number
) {
  let newTotalPoints = 0;
  newTotalPoints +=
    retakeSnitt + retakeAlderspoeng + retakeTilleggspoeng + retakeRealfagspoeng;
  return newTotalPoints;
}
function updateRetakeRealfagspoeng(grades: IGrade[], retakeGrades: IGrade[]) {
  let combinesGrades = [...retakeGrades];
  for (const g of grades) {
    if (!retakeGrades.find((r) => r.id === g.id)) {
      combinesGrades.push(g);
    }
  }
  return realfagspoeng(combinesGrades);
}
function increaseRetakeAlderspoeng(retakeAlderspoeng: number, dx: number) {
  let v = 0;
  v += retakeAlderspoeng + dx;
  return Math.min(Math.max(v, 0), 8);
}
function increaseRetakeExtraPoints(retakeExtraPoints: number, dx: number) {
  let v = 0;
  v += retakeExtraPoints + dx;
  return Math.min(Math.max(v, 0), 2);
}

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
function realfagspoeng(grades: IGrade[]) {
  let realfagspoeng = 0;
  for (const grade of grades) {
    let thisGradeRealfagspoeng = ALL_CLASSES_LIST.find(
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

function snitt(grades: IGrade[]) {
  const initialVals = { avg: 0, n: 0 };
  const averageGrade = grades.reduce(averageScores, initialVals);

  return Math.round((averageGrade.avg + 1) * 100 * 10) / 100;
}

function averageScores({ avg, n }: any, o: IGrade) {
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
function averageScoresExam({ avg, n }: any, o: IGrade) {
  // helper function
  return {
    avg: (o.examValue + n * avg) / (n + 1),
    n: n + 1,
  };
}
function retakeSnitt(grades: IGrade[], retakeGrades: IGrade[]) {
  let combinesGrades = [...retakeGrades];
  for (const g of grades) {
    if (!retakeGrades.find((r) => r.id === g.id)) {
      combinesGrades.push(g);
    }
  }
  const initialVals = { avg: 0, n: 0 };
  const averageGrade = combinesGrades.reduce(averageScores, initialVals);

  return Math.round((averageGrade.avg + 1) * 100 * 10) / 100;
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
