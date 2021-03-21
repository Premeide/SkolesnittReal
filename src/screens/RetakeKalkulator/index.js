import React, { useCallback, useState } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SegmentedControl from "rn-segmented-control";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData, allClasseslist } from "../../assets/data/GlobalData";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";

const gradeTabs = ["1", "2", "3", "4", "5", "6"];

const RetakeKalkulatorScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Retake</Text>
    </View>
  );
};

export default RetakeKalkulatorScreen;
