import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../../assets/styles/GlobalStyles.js";

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View
          style={[
            styles.row,
            {
              alignItems: "flex-end",
            },
          ]}
        >
          <Image
            source={require("../../assets/images/logo.jpg")}
            style={styles.logoImage}
          />
          <Text style={styles.headerTitle}>SkoleSnitt</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="user" size={28} color={GlobalStyles.blueColor.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
