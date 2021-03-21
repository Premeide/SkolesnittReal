import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const DiscoverScreen = ({ navigation }) => {
  const karakterGrenser = require("../../assets/data/karaktergrense.json");

  return (
    <View style={styles.container}>
      <Text>DISCOVER</Text>
    </View>
  );
};

export default DiscoverScreen;
