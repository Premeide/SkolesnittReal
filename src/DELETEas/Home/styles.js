import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  bubbleContainer: {
    alignSelf: "center",
    position: "absolute",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: WIDTH - 50,
    backgroundColor: "white",
    borderRadius: 20,
  },
  angleIcon: {},
  angleIconContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: "3%",
  },
  icon: { color: "black", marginHorizontal: 13 },
  iconContainer: {
    backgroundColor: "#1e90ff",
    borderRadius: 7,
    padding: 10,
    marginRight: 10,
  },
  penIcon: {
    color: "#03A9F4",
    borderBottomWidth: 2,
    borderBottomColor: "#03A9F4",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    paddingVertical: 5,
  },
  utitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  utext: {
    fontSize: 14,
    color: "grey",
  },
  utext2: {
    fontWeight: "bold",
    fontSize: 17,
    color: "grey",
  },
  num: {
    fontWeight: "bold",
    fontSize: 25,
    color: "grey",
  },

  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listtxt: {
    fontSize: 20,
    paddingVertical: 10,
    color: "black",
    width: "95%",
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
  },
  hamburger: { marginLeft: "5%" },
});

export default styles;

// row: {
//   flexDirection: "row",
// },
// txt: {
//   textAlign: "center",
//   color: "#20232a",
//   fontSize: 40,
//   fontWeight: "bold",
// },
// num: {
//   flex: 1,
//   textAlign: "right",
//   color: "#20232a",
//   fontSize: 30,
//   fontWeight: "bold",
//   paddingRight: 10,
// },
// txt2: {
//   textAlign: "center",
//   color: "grey",
//   fontSize: 15,
// },
// listtxt: {
//   fontSize: 20,
//   color: "#20232a",
// },
// bubble: {
//   marginTop: 6,
//   borderWidth: 3,
//   borderRadius: 20,
//   backgroundColor: "white",
//   borderColor: "#20232a",
//   color: "#20232a",
//   width: 370,
//   height: 115,
// },
// title: {
//   marginTop: 20,
//   fontSize: 30,
//   fontWeight: "bold",
// },
