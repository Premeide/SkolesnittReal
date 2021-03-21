import { StyleSheet, Dimensions } from "react-native";

//test branch

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    margin: 30,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 15,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  txt: {
    position: "absolute",
    width: 150,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    right: 120,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
    fontSize: 30,
    color: "white",
  },
  txt2: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  modaltxt: {
    alignSelf: "center",
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  regnButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnContainer: {
    marginTop: 10,
    marginHorizontal: 1,
    backgroundColor: "#03A9F4",
    width: Dimensions.get("screen").width / 3 - 10,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 13,
  },
});

export default styles;
