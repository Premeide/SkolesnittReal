import { StyleSheet, Dimensions } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: GlobalStyles.blueColor.color,
    padding: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  text: { fontSize: 15, color: "white", fontWeight: "bold" },
});

export default styles;
