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

export { IGrade, IExtraPoints, IEducation };
