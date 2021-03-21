import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#03A9F4",
    fontWeight: "bold",
    paddingVertical: 20,
  },
  bubbleContainer: {
    width: WIDTH,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  icon: { color: "black", marginHorizontal: 13 },
  placeholder: {
    marginVertical: 10,
    fontSize: 20,
    width: WIDTH - 160,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  listtxt: {
    fontSize: 20,
    paddingVertical: 10,
    color: "black",
    width: WIDTH - 140,
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
  },
  btnContainer: {
    backgroundColor: "#03A9F4",
    width: WIDTH - 120,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  btn: { fontSize: 20, fontWeight: "bold", color: "white" },
  // modalContainer: {
  //   backgroundColor: "#000000aa",
  //   flex: 1,
  //   alignItems: "center",
  // },
});

export default styles;
