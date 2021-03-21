import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData } from "../../assets/data/GlobalData";
import CustomHeader from "../../components/CustomHeader";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
