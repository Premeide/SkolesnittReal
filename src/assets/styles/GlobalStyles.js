import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const theme = {
  backgroundColor: "#eaeaea", // "#eaeaea"
  blueColor: "#246EE9", //#2C72FF
};
const styles = StyleSheet.create({
  blueColor: { color: theme.blueColor },
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  whiteContainer: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 7,
    borderRadius: 20,
  },
  whiteContainer2: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  underTitleText: { fontSize: 15, fontWeight: "bold" },
  greyContainer: {
    backgroundColor: "#EFF2F1",
    marginTop: 15,
    paddingHorizontal: 13,
    borderRadius: 10,
  },
  listText: {
    fontSize: 15,
    color: "black",
    marginVertical: 15,
  },
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: "lightgrey",
    marginHorizontal: 10,
  },
  row: { flexDirection: "row" },
  textInput: {
    width: "100%",
    backgroundColor: "#EFF2F1",
    marginTop: 10,
    fontSize: 15,
    padding: 7,
    fontWeight: "bold",
    borderRadius: 10,
  },
  textInput2: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#EFF2F1",
    fontSize: 15,
    padding: 10,
    margin: 2,
    fontWeight: "bold",
    borderRadius: 20,
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
  smallText: {
    marginTop: 10,
    fontSize: 10,
    color: "grey",
  },
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: theme.blueColor,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#52006A",
  },
  addText: {
    fontSize: 15,
    color: theme.blueColor,
    fontWeight: "bold",
  },
  modalContainer: {
    // borderWidth: 1,
    // borderColor: "black",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    margin: 20,
    padding: 10,
    width: "90%",
    height: "90%",
  },
  kalkText: { fontSize: 15, color: "black", fontWeight: "bold" },
  customBtn2Bottom: { bottom: "10%" },
});

export default styles;
