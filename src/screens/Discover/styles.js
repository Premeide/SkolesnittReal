import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listtxt: {
    fontSize: 20,
    paddingVertical: 10,
    color: "black",
    width: Dimensions.get("screen").width - 60,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  searchContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  searchText: { fontSize: 25, marginLeft: 10 },
});

export default styles;
