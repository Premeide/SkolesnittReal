import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const AboutScreen = (props) => {
  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>SkoleSnitt</Text>
          <Text style={GlobalStyles.listText}>
            Er du søker til Universitet eller høyskole? Lurer du på hvilke
            muligheter du har? Da har vi verktøyet for deg!
          </Text>
          <Text style={GlobalStyles.listText}>
            Hva skal appen kunne gjøre? Finne universitet som er egnet søkers
            ønske. Spesifisere hva søkeren trenger for å komme inn på et
            spesfikt studie. Poengsum til søker, opptakskrav fra
            høyskole/universitet. Poenget er å digitalisere listen som samordna
            opptak legger ut.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutScreen;
