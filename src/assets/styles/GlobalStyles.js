import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaeaea" },
  whiteContainer: { backgroundColor: "white", padding: 15, marginTop: 7 },
  whiteContainer2: { flex: 1, backgroundColor: "white", padding: 15 },
  underTitleText: { fontSize: 20, fontWeight: "bold" },
  greyContainer: {
    backgroundColor: "#EFF2F1",
    marginTop: 15,
    paddingHorizontal: 13,
  },
  listText: { fontSize: 20, color: "black", marginVertical: 15, width: "92%" },
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: "lightgrey",
    marginHorizontal: 10,
  },
  row: { flexDirection: "row" },
  textInput: {
    width: 100,
    textAlign: "center",
    backgroundColor: "#EFF2F1",
    marginTop: 10,
    fontSize: 25,
    padding: 5,
    fontWeight: "bold",
  },
  textInput2: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#EFF2F1",
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
  },
  listEndContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  checkbox: { borderColor: "blue" },
  customBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "10%",
    bottom: "1%",
  },
});

export default styles;
