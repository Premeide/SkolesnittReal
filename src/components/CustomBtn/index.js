import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const CustomBtn = (props) => {
  const { text: txt } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{txt}</Text>
    </View>
  );
};

export default CustomBtn;
