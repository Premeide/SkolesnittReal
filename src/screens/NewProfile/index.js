import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData } from "../../assets/data/GlobalData";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";

const NewProfileScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>NewProfileScreen</Text>
      </View>
    </ScrollView>
  );
};

export default NewProfileScreen;
