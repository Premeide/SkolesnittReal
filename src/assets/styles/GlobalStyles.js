import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const theme = {
  backgroundColor: "#eaeaea",
  blueColor: "#2C72FF",
};
const styles = StyleSheet.create({
  blueColor: { color: theme.blueColor },
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  whiteContainer: { backgroundColor: "white", padding: 15, marginTop: 7 },
  whiteContainer2: { flex: 1, backgroundColor: "white", padding: 15 },
  underTitleText: { fontSize: 15, fontWeight: "bold" },
  greyContainer: {
    backgroundColor: "#EFF2F1",
    marginTop: 15,
    paddingHorizontal: 13,
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
  },
  textInput2: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#EFF2F1",
    fontSize: 15,
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
  smallCenteredText: {
    marginTop: 10,
    textAlign: "center",
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
  },
  addText: {
    fontSize: 15,
    color: theme.blueColor,
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
  kalkText: { fontSize: 15, color: "black", fontWeight: "bold" },
  customBtn2Bottom: { bottom: "10%" },
});

export default styles;

// godkjent i fag?:
// drite i de

// 23/5 men kan se konkurranse?:
// høre med thomas
// ikke 23/5 ved profile

// tar opp fag utenfor 23/5 men kan se 23/5 poeng?
// la de

// 23/5 check fjerne ikke-235 fag, men kan legges til?
// se 2

// se ny poeng med segmented control?
// jaja

// evt ekstra alderspoeng ved ta opp fag legges til selv?
// info om det. er nok.

// ha "utdanninger? vits?jaj vis sted viktig

// SKRIV INN:
// husk at dersom satser på 23/5 fokus på riktig fag. (info)
