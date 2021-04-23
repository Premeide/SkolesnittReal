import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";

const CustomBtn = (props) => {
  const { text: txt } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{txt}</Text>
    </View>
  );
};

export default CustomBtn;
