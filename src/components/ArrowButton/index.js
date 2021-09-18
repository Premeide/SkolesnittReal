import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

const ArrowButton = () => {
  return (
    <Animatable.View animation="slideInRight" style={styles.container}>
      <Icon name="arrow-right" size={30} color="white" />
    </Animatable.View>
  );
};

export default ArrowButton;
