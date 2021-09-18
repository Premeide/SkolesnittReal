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
          <Text style={styles.headerTitle}>koleSnitt</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{
            backgroundColor: "#eaeaea",
            padding: 12,
            borderRadius: 20,
            bottom: 4,
          }}
        >
          <Icon name="user" size={20} color={GlobalStyles.blueColor.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
