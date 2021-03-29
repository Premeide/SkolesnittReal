import { StyleSheet, Dimensions } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const styles = StyleSheet.create({
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: GlobalStyles.blueColor.color,
  },
  addText: {
    fontSize: 20,
    color: GlobalStyles.blueColor.color,
    fontWeight: "bold",
  },
  modalContainer: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 10,
    flex: 1,
  },
});

export default styles;
