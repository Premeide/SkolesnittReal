import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

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
