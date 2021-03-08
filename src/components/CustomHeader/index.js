import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const CustomHeader = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/skoleLogo.png")}
      />
      <Text style={styles.title}> </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listText}>Mitt snitt</Text>
        <Icon name="angle-down" size={15} />
      </View>
    </View>
  );
};

export default CustomHeader;
