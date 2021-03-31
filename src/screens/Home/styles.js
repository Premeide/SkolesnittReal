import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  poeng: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default styles;
