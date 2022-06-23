import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import CollapsibleItem from "../components/CollapsibleItem";

interface IQuestionsScreen {
  navigation: any;
  route: any;
}
class QuestionsScreen extends Component<IQuestionsScreen> {
  render() {
    return (
      <View style={GlobalStyles.container}>
        <ScrollView>
          <Text style={GlobalStyles.listText}>
            {"    "}Finner ikke spørsmålet ditt her?{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => this.props.navigation.navigate("Feedback")}
            >
              Spør her
            </Text>
          </Text>
          <CollapsibleItem title="Når er søknadsfristen?">
            <Text style={GlobalStyles.listText}>
              Ordinær søknadsfrist for høyere utdanning er{" "}
              <Text style={{ fontWeight: "bold" }}>20. april kl. 14.00.</Text>
            </Text>
            <Text style={GlobalStyles.listText}>
              Andre viktige datoer for deg som skal studere på universitet eller
              høgskole finner du i utdanning.no sin oversikt over søknadsfrister
              i høyere utdanning.
            </Text>
          </CollapsibleItem>

          <CollapsibleItem title="Hvordan vet jeg om jeg har generell studiekompetanse?">
            <Text style={GlobalStyles.listText}>
              Den vanligste måten å få studiekompetanse er å fullføre et
              studieforberedende utdanningsprogram i videregående opplæring. Men
              det finnes også andre muligheter. Du kan lese om det i vår
              artikkel "Slik får du studiekompetanse". Du finner en oversikt
              over hvilke utdanninger som gir generell studiekompetanse på
              nettsidene til Samordna opptak.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Hvor mange poeng har jeg?">
            <Text style={GlobalStyles.listText}>
              Karakterkalkulatoren vår regner ut poengene dine, ved at du legger
              til eller fjerner fag og fyller inn dine karakterer. Du kan også
              lese om hvordan poengsummen regnes ut regnes ut hos Samordna
              opptak
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Hva gjør jeg hvis jeg ikke finner studiet jeg vil søke på?">
            <Text style={GlobalStyles.listText}>
              Dette kan være en utdanning hvor du søker direkte til lærestedet
              og ikke gjennom Samordna opptak. Samordna opptak anbefaler at du
              bør kontakte lærestedet.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Hva er fristen for å laste opp dokumentasjon?">
            <Text style={GlobalStyles.listText}>
              Har du søknadsfrist 1. mars, må du laste opp dokumentasjon senest
              20. mars.
            </Text>
            <Text style={GlobalStyles.listText}>
              Har du søknadsfrist 20. april, må du laste opp dokumentasjon
              senest 20. april. Du må laste opp dokumentasjon på utdanning og
              praksis som avsluttes våren 2021 senest 1. juli. Les om opplasting
              av dokumentasjon på Samordna opptak sine nettsider.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Hvordan finner jeg ut hva jeg må laste opp av dokumentasjon?">
            <Text style={GlobalStyles.listText}>
              Samordna opptak gir eksempler på godkjent dokumentasjon og
              veiledning til hvordan du laster opp dokumentasjon.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Kan jeg forandre rekkefølgen på studieønskene mine?">
            <Text style={GlobalStyles.listText}>
              Du kan omprioritere studieønskene dine fram til 1. juli. Les mer
              om omprioritering på Samordna opptak sine nettsider.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="I hvilke bransjer passer det å ha lærling?">
            <Text style={GlobalStyles.listText}>
              Tidligere omfattet fagopplæringen bare håndverk og industri. I dag
              er det rundt 180 fag som fører fram til fag- eller svennebrev.
              Lærlingordningen omfatter mange fagområder, blant annet helse- og
              oppvekstfag, IT, design og håndverk, medier og kommunikasjon,
              service og samferdsel.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Kan bedriften selv bestemme hvem som får læreplass?">
            <Text style={GlobalStyles.listText}>
              Ja, godkjente lærebedrifter bestemmer selv hvem de skal ta inn som
              lærling. Noen foretrekker å søke etter lærlinger selv og
              gjennomfører en vanlig ansettelsesprosedyre. Andre velger
              kandidatene som bransjens opplæringskontor formidler. Det er også
              vanlig at lærlingene selv oppsøker bedriften og ber om læreplass.
            </Text>
            <Text style={GlobalStyles.listText}>
              Nye lærlinger begynner vanligvis læretiden i august når skolen
              starter, og du bør derfor gå i gang med rekrutteringsarbeidet
              tidlig på året.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Hva innebærer det å være lærebedrift?">
            <Text style={GlobalStyles.listText}>
              Godkjente lærebedrifter er forpliktet til å ha en
              opplæringsansvarlig og må sørge for at lærlingene når de
              kompetansemålene som står i læreplanen. Bedriften kan velge mellom
              å være selvstendig lærebedrift med hele ansvaret for opplæring av
              lærlingen og oppmelding til fag-/svenneprøve – eller inngå
              samarbeid med et opplæringskontor som tar ansvaret for å følge opp
              opplæringen og bidra til at den blir best mulig, samt å melde
              lærlingene opp til fag- eller svenneprøve.
            </Text>
            <Text style={GlobalStyles.listText}>
              En annen mulighet er å bli med i en opplæringsring, der små
              bedrifter går sammen om opplæringen av lærlinger gjennom å velge
              en faglig ansvarlig.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Kan vi ta inn lærlinger selv om vi ikke kan gi full opplæring i faget?">
            <Text style={GlobalStyles.listText}>
              Ja. Et opplæringskontor kan sørge for at lærlingen får nødvendig
              opplæring på områder som ikke virksomheten kan gi opplæring i.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Må lærebedrifter være over en viss størrelse?">
            <Text style={GlobalStyles.listText}>
              Nei, selv den minste lille virksomhet kan ta imot lærlinger. For
              små virksomheter kan det være en fordel å ha medlemskap i et
              opplæringskontor, som da tar hele ansvaret, oppsynet og
              tilretteleggingsarbeidet for lærlingen
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Er vi forpliktet til å tilby jobb etter læretiden?">
            <Text style={GlobalStyles.listText}>
              Nei, når lærlingen har bestått fag- eller svenneprøven er ansvaret
              som lærebedrift over. Lærlingen står fritt til å søke seg jobb
              hvor som helst, men mange lærebedrifter velger å tilby lærlingen
              jobb fordi de da kan rekruttere en medarbeider som kjenner
              virksomheten og har vist sin dyktighet gjennom læretiden.
            </Text>
          </CollapsibleItem>
          <CollapsibleItem title="Hvor mye tjener lærlinger?">
            <Text style={GlobalStyles.listText}>
              Lønnen til lærlinger og lærekandidater varierer fra fag til fag.
              Utgangspunktet er at lærlingen tjener en årslønn fordelt på
              læretiden. Lønnen er lavere i starten av læretiden enn på slutten.
            </Text>
          </CollapsibleItem>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default QuestionsScreen;
