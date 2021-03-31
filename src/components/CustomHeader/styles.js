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
  logoImage: { height: 40, width: 40 },
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: GlobalStyles.blueColor.color,
  },
});

export default styles;
