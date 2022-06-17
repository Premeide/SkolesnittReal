import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../assets/styles/GlobalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";
const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
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
            source={require("../assets/images/logo.jpg")}
            style={styles.logoImage}
          />
          {/* <Text style={styles.headerTitle}>k o l e S n i t t</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{
            backgroundColor: "#eaeaea",
            padding: 8,
            paddingHorizontal: 12,
            borderRadius: 50,
            bottom: 4,
          }}
        >
          <Icon name="user" size={23} color={GlobalStyles.blueColor.color} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoImage: { height: 40, width: 40 },
  headerTitle: {
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.blueColor.color,
  },
  iconContainer: {
    backgroundColor: "lightgrey",
    padding: 6,
    borderRadius: 30,
  },
});

export default CustomHeader;
