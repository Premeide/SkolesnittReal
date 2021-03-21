import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#03A9F4",
  },
  footer: {
    alignItems: "center",
    flex: 2,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  logo: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 150,
    paddingTop: 20,
  },
  input: {
    height: 45,
    width: WIDTH - 40,
    borderRadius: 40,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "white",
    color: "black",
  },
  inputIcon: {
    position: "absolute",
    top: 10,
    left: 17,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginText: {
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    borderRadius: 30,
    backgroundColor: "#03A9F4",
    height: 50,
    width: WIDTH - 60,
  },
  errorText: {
    color: "red",
  },
});

export default styles;
