import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";

const CustomBtn = (props) => {
  const { text: txt } = props;
  return (
    <Animatable.View style={styles.container} animation="slideInUp">
      <Text style={styles.text}>{txt}</Text>
    </Animatable.View>
  );
};

export default CustomBtn;
