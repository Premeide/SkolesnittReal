import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import styles from "./styles";

const AboutScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Om appen</Text>
        <Text style={styles.paragraph}>
          Er du søker til Universitet eller høyskole? Lurer du på hvilke
          muligheter du har? Da har vi verktøyet for deg! Hva skal appen kunne
          gjøre? Finne universitet som er egnet søkers ønske. Spesifisere hva
          søkeren trenger for å komme inn på et spesfikt studie. Poengsum til
          søker, opptakskrav fra høyskole/universitet. Poenget er å digitalisere
          listen som samordna opptak legger ut.
        </Text>
        <Text style={styles.title}>Karakterkalkulatoren</Text>
        <Text style={styles.paragraph}>
          Bruk Karakterkalkulatoren til å regne ut poengene dine. Med
          studievelger kan du se hvilke studier du kan komme inn på med dine
          poeng. Den viser deg også hvilke fag du må ha på videregående, for å
          komme inn på ulike studier.
        </Text>
        <Text style={styles.title}>Alderspoeng</Text>
        <Text style={styles.paragraph}>
          Fra og med det året du fyller 20 år får du 2 alderspoeng for hvert år,
          hvis du har fullført og bestått videregående opplæring. Du kan ikke få
          mer enn 8 alderspoeng.
        </Text>
        <Text style={styles.title}>Tilleggspoeng</Text>
        <Text style={styles.paragraph}>
          I ordinær kvote kan du få inntil 2 poeng for enten folkehøgskole,
          militærtjeneste, siviltjeneste, fagskole eller høyere utdanning. Du
          kan bare få tilleggspoeng for én av delene, så du kan ikke få mer enn
          2 tilleggspoeng.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
