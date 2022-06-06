import { StyleSheet } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoImage: { height: 40, width: 40 },
  headerTitle: {
    fontFamily: "serif",
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
