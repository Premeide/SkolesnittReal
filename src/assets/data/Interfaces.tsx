interface IGrade {
  id: string;
  value: number;
  includeExam: boolean;
  examValue: number;
}
interface IExtraPoints {
  value: number;
  Military: boolean;
  Folkehøyskole: boolean;
  _30points: boolean;
  _60points: boolean;
}

interface IEducation {
  studiekode: number;
  studienavn: string;
  lærerstedskode: string;
  studiested: string;
  felt: string;
  opptakskrav: string;
  poenggrense: string;
  antall_venteliste: number;
  poenggrense_f: string;
  venteliste_f: number;
}
interface IInitialState {
  tutorial: boolean;
  yearOfBirth: string;
  grades: IGrade[];
  retakeGrades: IGrade[];
  educations: number[];

  //current grades summary
  totalPoints: number;
  alderspoeng: number;
  extraPoints: {
    value: number;
    Military: boolean;
    Folkehøyskole: boolean;
    _30points: boolean;
    _60points: boolean;
  };
  realfagspoeng: number;
  snitt: number;

  //retake grades summary
  retakeTotalPoints: number;
  retakeAlderspoeng: number;
  retakeExtraPoints: number;
  retakeRealfagspoeng: number;
  retakeSnitt: number;
}

export { IGrade, IExtraPoints, IEducation, IInitialState };
