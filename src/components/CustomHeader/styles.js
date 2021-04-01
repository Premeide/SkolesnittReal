import { StyleSheet } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoImage: { height: 50, width: 50, marginRight: 10 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.blueColor.color,
  },
  iconContainer: {
    backgroundColor: "lightgrey",
    padding: 6,
    borderRadius: 30,
  },
});

export default styles;
