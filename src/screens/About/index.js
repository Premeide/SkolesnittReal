import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const AboutScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>ABOUT</Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
