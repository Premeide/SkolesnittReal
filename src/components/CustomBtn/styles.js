import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "blue",
    padding: 10,
    width: "90%",
  },
  text: { fontSize: 20, color: "white", fontWeight: "bold" },
});

export default styles;
