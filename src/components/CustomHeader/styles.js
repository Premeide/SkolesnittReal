import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("screen").height / 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#03A9F4",
    marginBottom: 10,
  },
  image: { height: 50, width: 50, marginLeft: 10 },
  title: { fontSize: 30, fontWeight: "bold" },
  listContainer: {
    height: 30,
    width: 80,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  listText: { fontWeight: "bold", textDecorationLine: "underline" },
});

export default styles;
