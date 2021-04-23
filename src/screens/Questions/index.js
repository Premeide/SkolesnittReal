import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const faqData = [
  {
    text:
      "Ofte stilte spørsmål Hvordan regner jeg ut snittet mitt?\n\n Enkelt og greit: snittet ditt er summen av alle dine karakterer, delt på antall karakterer. Da vil du få ett tall som forteller gjennomsnittet av dine karakterer. Når man da skal søke høyere utdanning er det i tillegg til karaktersnittet mulig å legge til andre former for poeng. Det er for eksempel\n\n Realfagspoeng\n Alderspoeng\n Språkpoeng\n Tilleggs poeng\n\n Dersom du har tatt realfag, for eksempel biologi 1 og kjemi 1, vil du i få ekstra poeng som du kan legge til karaktersnittet ditt. De ulike realfagene gir alt fra 0,5-1 poeng per fag, men til sammen kan du kun regne med 4 realfagspoeng. Dette betyr at det er en grense på hvor mange tilleggspoeng du kan ha. \n\n La oss si at du etter videregående har gått et år i militæret og du har studert et år med 60 studiepoeng på høyere utdanning. Et år i militæret gir deg 2 tilleggspoeng. Og 60 studiepoeng gir 2 tilleggspoeng. Men! Du kan kun legge til 2 tilleggspoeng totalt. Det betyr at du ikke får 4 poeng til sammen, men kun 2.\n\n Dette gjelder også for eksempel realfags og språkpoeng. Du kan kun legge til 4 realfags/språkpoeng.\n\n Hva er 23/5 regelen?\n\n 23/5-regelen er en ..... hvor du kan søke høyere utdanning med karakter i seks fag. Dersom du ønsker kan du også legge til realfag/språkfagspoeng. Når du søker med 23/5 regelen er det andre regler for alderspoeng. Du mottar nemlig alderspoeng fra du fyller 24 år og du kan få 8 alderspoeng totalt. Det vil si\n\n 24 år: 2 poeng\n 25 år: 4 poeng\n 26 år: 6 poeng\n 27 år: 8 poeng (maks alderspoeng er nådd)\n\n Du er kvalifisert for å søke med 23/5-regelen dersom du:\n Er minst 23 år\n Har fullført fem års praksis (det kan være at du har jobbet noen år og/eller studert. VGS teller og!)\n\n Du søker da høyere utdanning med karakter i disse seks fagene:\n\n Norsk \n Matematikk\n Historie\n Samfunnsfag\n Naturfag\n Engelsk\n\n Du kan også legge til realfag og språkfag, men du kan ikke legge til andre fag som ikke gir poeng (eksempel vis geografi, kroppsøving, religion osv)\n\n La oss si at du er 25 år og du har gått studiespesialiserende utdanningsprogram på videregående. Nå ønsker du å søke på medisinstudiet og du ser at du har høye karakterer i de fleste overnevnte fag: norsk, matematikk, historie, samfunnsfag, naturfag og engelsk. Og du ser at du har dårligere karakterer i noen av programfagene psykologi 1 og psykologi 2, sosiologi og sosialantropologi samt sosialkunnskap. Du vet at du trenger å forbedre snittet ditt og at medisinstudiet krever disse realfagene: kjemi 1, kjemi 2, fysikk 1, matematikk R1 eller matematikk S1+S2.\n\n Da kan det være lurt å av deg å starte med å forbedre de seks basisfagene og deretter ta realfagene. Er du kvalifisert for å søke med 23/5 regelen kan du da slippe å ta med programfagene. \n\n Dersom du derimot har høye karakterer i programfagene kan dette være med å heve det totale snittet ditt...",
  },
];

const QuestionsScreen = (props) => {
  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.listText}>{faqData[0].text}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default QuestionsScreen;
