import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const name = (props) => {
  return (
    <View style={styles.container}>
      <Text>a functional component</Text>
    </View>
  );
};

export default name;
