import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: "blue",
  },
  addText: { fontSize: 20, color: "blue", fontWeight: "bold" },
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
