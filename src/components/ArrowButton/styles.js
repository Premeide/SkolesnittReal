import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: GlobalStyles.blueColor.color,
    padding: 15,
    width: "30%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default styles;
