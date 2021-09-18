let localData = {
  skolePoeng: { value: 0 },
  born: { value: 2020 },
  extraPoints: { value: 0, m: false, f: false, tre: false, seks: false },
  grades: {
    value: [
      { value: 0, id: "Engelsk", exam: false, exva: 0 },
      { value: 0, id: "Fremmedspråk", exam: false, exva: 0 },
      { value: 0, id: "Geografi", exam: false, exva: 0 },
      { value: 0, id: "Historie", exam: false, exva: 0 },
      { value: 0, id: "Naturfag", exam: false, exva: 0 },
      { value: 0, id: "Kroppsøving", exam: false, exva: 0 },
      { value: 0, id: "Matematikk 1T/1P", exam: false, exva: 0 },
      { value: 0, id: "Matematikk 2T/2P", exam: false, exva: 0 },
      { value: 0, id: "Norsk hovedmål", exam: false, exva: 0 },
      { value: 0, id: "Norsk muntlig", exam: false, exva: 0 },
      { value: 0, id: "Norsk sidemål", exam: false, exva: 0 },
      { value: 0, id: "Religion og etikk", exam: false, exva: 0 },
      { value: 0, id: "Samfunnsfag", exam: false, exva: 0 },
    ],
  },
  wantedEducations: { studiekode: [] },
  retakeClasses: [],
  firstLogIn: { value: true },
  firstTimeKalk: { value: true },
  firstTimeHome: { value: true },
};

const allClasseslist = [
  { type: 0, name: "Aktivitetslære 3" },
  { type: 0.5, name: "Arabisk nivå 1 programfag" },
  { type: 0.5, name: "Arabisk nivå 2 programfag" },
  { type: 1, name: "Arabisk nivå 3 programfag" },
  { type: 0.5, name: "Biologi 1" },
  { type: 0.5, name: "Biologi 2" },
  { type: 0, name: "Dans i perspektiv 2" },
  { type: 0, name: "Design og arkitektur 1" },
  { type: 0, name: "Design og arkitektur 2" },
  { type: 0, name: "Design og arkitektur 3" },
  { type: 0, name: "Engelskspråklig litteratur og kultur skriftlig" },
  { type: 0, name: "Entrepenørskap og bedriftsutvikkling 2" },
  { type: 0, name: "Ergonomi og bevegelse 1" },
  { type: 0, name: "Ergonomi og bevegelse 2" },
  { type: 0.5, name: "Finsk nivå 1 programfag" },
  { type: 0.5, name: "Finsk nivå 2 programfag" },
  { type: 1, name: "Finsk nivå 3 programfag" },
  { type: 0.5, name: "Fransk nivå 1 programfag" },
  { type: 0.5, name: "Fransk nivå 2 programfag" },
  { type: 1, name: "Fransk nivå 3 programfag" },
  { type: 0, name: "Friluftsliv 1" },
  { type: 0, name: "Friluftsliv 2" },
  { type: 0.5, name: "Fysikk 1" },
  { type: 1, name: "Fysikk 2" },
  { type: 0.5, name: "Geofag 1" },
  { type: 0.5, name: "Geofag 2" },
  { type: 0, name: "Grunntrening i dans 1" },
  { type: 0, name: "Grunntrening i dans 2" },
  { type: 0, name: "Historie og filosofi 1" },
  { type: 0, name: "Idrett og samfunn" },
  { type: 0.5, name: "Informasjonsteknologi 1" },
  { type: 0.5, name: "Informasjonsteknologi 2" },
  { type: 0, name: "Instruksjon og ledelse" },
  { type: 0, name: "Instrument kor samspill 1" },
  { type: 0, name: "Instrument kor samspill 2" },
  { type: 0, name: "Internasjonal Engelsk muntlig" },
  { type: 0, name: "Internasjonal Engelsk skriftlig" },
  { type: 0.5, name: "Italiensk nivå 1 programfag" },
  { type: 0.5, name: "Italiensk nivå 2 programfag" },
  { type: 1, name: "Italiensk nivå 3 programfag" },
  { type: 0.5, name: "Japansk nivå 1 programfag" },
  { type: 0.5, name: "Japansk nivå 2 programfag" },
  { type: 1, name: "Japansk nivå 3 programfag" },
  { type: 0.5, name: "Kinesisk nivå 1 programfag" },
  { type: 0.5, name: "Kinesisk nivå 2 programfag" },
  { type: 1, name: "Kinesisk nivå 3 programfag" },
  { type: 0.5, name: "Kjemi 1" },
  { type: 0.5, name: "Kjemi 2" },
  { type: 0, name: "Kommunikasjon og kultur 1" },
  { type: 0, name: "Kommunikasjon og kultur 2" },
  { type: 0, name: "Kommunikasjon og kultur 3" },
  { type: 0.5, name: "Koreansk nivå 1 programfag" },
  { type: 0.5, name: "Koreansk nivå 2 programfag" },
  { type: 1, name: "Koreansk nivå 3 programfag" },
  { type: 0.5, name: "Lulesamisk nivå 1 programfag" },
  { type: 1, name: "Lulesamisk nivå 3 programfag" },
  { type: 0, name: "Markedsføring og ledelse 1" },
  { type: 0, name: "Markedsføring og ledelse 2" },
  { type: 0.5, name: "Matematikk R1" },
  { type: 1, name: "Matematikk R2" },
  { type: 0.5, name: "Matematikk S1" },
  { type: 0.5, name: "Matematikk S2" },
  { type: 0, name: "Medie- og informasjonskunnskap 1" },
  { type: 0, name: "Medie- og informasjonskunnskap 2" },
  { type: 0, name: "Mediedesign og medieuttrykk" },
  { type: 0, name: "Mediekommunikasjon" },
  { type: 0, name: "Medieproduksjon" },
  { type: 0, name: "Medier og kommunikasjon" },
  { type: 0, name: "Musikk i perspektiv 1" },
  { type: 0, name: "Musikk i perspektiv 1 muntlig" },
  { type: 0, name: "Musikk i perspektiv 2" },
  { type: 0, name: "Musikk i perspektiv 2 muntlig" },
  { type: 0, name: "Naturbasert aktivitet" },
  { type: 0, name: "Naturbasert produksjon" },
  { type: 0, name: "Naturforvaltning" },
  { type: 0.5, name: "Nordsamisk nivå 1 programfag" },
  { type: 0.5, name: "Nordsamisk nivå 2 programfag" },
  { type: 1, name: "Nordsamisk nivå 3 programfag" },
  { type: 0, name: "Politikk og menneskerettigheter" },
  { type: 0, name: "Psykologi 1" },
  { type: 0, name: "Psykologi 2" },
  { type: 0, name: "Reiseliv og språk 1" },
  { type: 0, name: "Reiseliv og språk 2" },
  { type: 0, name: "Rettslære 1" },
  { type: 0, name: "Rettslære 2" },
  { type: 0.5, name: "Russisk nivå 1 programfag" },
  { type: 1, name: "Russisk nivå 3 programfag" },
  { type: 0, name: "Samfunnsfaglig engelsk muntlig" },
  { type: 0, name: "Samfunnsfaglig engelsk skriftlig" },
  { type: 0, name: "Samfunnsgeografi" },
  { type: 0, name: "Samfunnsøkonomi 1" },
  { type: 0, name: "Samfunnsøkonomi 2" },
  { type: 0, name: "Samisk historie og samfunn 1" },
  { type: 0, name: "Samisk historie og samfunn 2" },
  { type: 0, name: "Scenisk dans 1" },
  { type: 0, name: "Scenisk dans 2" },
  { type: 0, name: "Scenisk dans 3" },
  { type: 0, name: "Sosialkunnskap" },
  { type: 0, name: "Sosiologi og sosialantropologi" },
  { type: 0.5, name: "Spansk nivå 1 programfag" },
  { type: 0.5, name: "Spansk nivå 2 programfag" },
  { type: 1, name: "Spansk nivå 3 programfag" },
  { type: 0.5, name: "Sørsamisk nivå 1 programfag" },
  { type: 0.5, name: "Sørsamisk nivå 2 programfag" },
  { type: 1, name: "Sørsamisk nivå 3 programfag" },
  { type: 0, name: "Teater i perspektiv 1" },
  { type: 0, name: "Teater i perspektiv 2" },
  { type: 0, name: "Teater og bevegelse 1" },
  { type: 0, name: "Teater og bevegelse 2" },
  { type: 0, name: "Teaterproduksjon 1" },
  { type: 0, name: "Teaterproduksjon 2" },
  { type: 0.5, name: "Tegnspråk nivå 1 programfag" },
  { type: 0.5, name: "Tegnspråk nivå 2 programfag" },
  { type: 1, name: "Tegnspråk nivå 3 programfag" },
  { type: 0.5, name: "Teknologi og forskningslære 1" },
  { type: 0.5, name: "Teknologi og forskningslære 2" },
  { type: 0, name: "Toppidrett 1" },
  { type: 0, name: "Toppidrett 2" },
  { type: 0, name: "Toppidrett 3" },
  { type: 0, name: "Treningsledelse 1" },
  { type: 0, name: "Treningsledelse 2+3" },
  { type: 0, name: "Treningslære 1" },
  { type: 0, name: "Treningslære 2" },
  { type: 0, name: "Tverrfaglig eksamen medier og kommunikasjon" },
  { type: 0.5, name: "Tysk nivå 1 programfag" },
  { type: 0.5, name: "Tysk nivå 2 programfag" },
  { type: 1, name: "Tysk nivå 3 programfag" },
  { type: 0, name: "Visuelle kunstfag 1" },
  { type: 0, name: "Visuelle kunstfag 2" },
  { type: 0, name: "Visuelle kunstfag 3" },
  { type: 0, name: "Økonomi og ledelse" },
  { type: 0, name: "Økonomistyring" },
  { type: 0, name: "Engelsk" },
  { type: 0, name: "Fremmedspråk" },
  { type: 0, name: "Geografi" },
  { type: 0, name: "Historie" },
  { type: 0, name: "Kroppsøving" },
  { type: 0, name: "Matematikk 1T/1P" },
  { type: 0, name: "Matematikk 2T/2P" },
  { type: 0, name: "Naturfag" },
  { type: 0, name: "Norsk hovedmål" },
  { type: 0, name: "Norsk muntlig" },
  { type: 0, name: "Norsk sidemål" },
  { type: 0, name: "Religion og etikk" },
  { type: 0, name: "Samfunnsfag" },
  { type: 0, name: "Dans i perspektiv 1" },
  { type: 0, name: "Drama og samfunn" },
  { type: 0, name: "Engelskspråklig litteratur og kultur muntlig" },
  { type: 0, name: "Entrepenørskap og bedriftsutvikkling 1" },
  { type: 0, name: "Aktivitetslære 2" },
  { type: 0, name: "Historie og filosofi 2" },
  { type: 0.5, name: "Lulesamisk nivå 2 programfag" },
  { type: 0.5, name: "Russisk nivå 2 programfag" },
  { type: 0, name: "Helsefremmende arbeid 1 (helse)" },
  { type: 0, name: "Helsefremmende arbeid 2 (helse)" },
  { type: 0, name: "Kommunikasjon og samhandling 1 (helse)" },
  { type: 0, name: "Kommunikasjon og samhandling 2 (helse)" },
  { type: 0, name: "Yrkesliv i helse- og oppvekstfag 1 (helse)" },
  { type: 0, name: "Yrkesliv i helse- og oppvekstfag 2 (helse)" },
  { type: 0, name: "Yrkesfaglig fordypning 1 (helse)" },
  { type: 0, name: "Yrkesfaglig fordypning 2 (helse)" },
  { type: 0, name: "Tverrfaglig eksamen (helse)" },
  { type: 0, name: "Kristendomskunnskap 1" },
  { type: 0, name: "Kristendomskunnskap 2" },
];
const basisClasses = [
  "Norsk hovedmål",
  "Norsk muntlig",
  "Norsk sidemål",
  "Matematikk 1T/1P",
  "Matematikk 2T/2P",
  "Naturfag",
  "Historie",
  "Engelsk",
  "Samfunnsfag",
  "Kjemi 1",
  "Kjemi 2",
  "Fysikk 1",
  "Fysikk 2",
  "Matematikk R1",
  "Matematikk R2",
  "Matematikk S1",
  "Matematikk S2",
  "Biologi 1",
  "Biologi 2",
  "Geofag 1",
  "Geofag 2",
  "Informasjonsteknologi 1",
  "Informasjonsteknologi 2",
  "Fransk nivå 1 programfag",
  "Fransk nivå 2 programfag",
  "Finsk nivå 1 programfag",
  "Arabisk nivå 1 programfag",
  "Italiensk nivå 1 programfag",
  "Japansk nivå 1 programfag",
  "Kinesisk nivå 1 programfag",
  "Koreansk nivå 1 programfag",
  "Lulesamisk nivå 1 programfag",
  "Nordsamisk nivå 1 programfag",
  "Russisk nivå 1 programfag",
  "Russisk nivå 1 programfag",
  "Sørsamisk nivå 1 programfag",
  "Tegnspråk nivå 1 programfag",
  "Teknologi og forskningslære 1",
  "Tysk nivå 1 programfag",
];
export { localData, allClasseslist, basisClasses };
