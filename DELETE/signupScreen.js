import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width: WIDTH } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordb, setPasswordb] = useState();
  const [errorText, setErrorText] = useState(" ");

  function check() {
    let tempError = "";
    let tempReturn = true;
    username && password && passwordb
      ? console.log("nei")
      : (tempError = "Fyll inn brukernavn og passord");
    setErrorText(tempError);
    tempError.length === 0 ? (tempReturn = true) : (tempReturn = false);
    return tempReturn;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Icon name="user" style={styles.inputIcon} size={25} />
          <TextInput
            style={styles.input}
            placeholder="Brukernavn"
            placeholderTextColor="grey"
            onChangeText={(text) => setUsername(text)}
            onEndEditing={() => check()}
          />
        </View>
        <Text> </Text>
        <View style={styles.row}>
          <Icon name="lock" style={styles.inputIcon} size={25} />
          <TextInput
            style={styles.input}
            placeholder="Passord"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            onEndEditing={() => check()}
          />
        </View>
        <Text> </Text>
        <View style={styles.row}>
          <Icon name="lock" style={styles.inputIcon} size={25} />
          <TextInput
            style={styles.input}
            placeholder="Passordbekreftelse"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => setPasswordb(text)}
            onEndEditing={() => check()}
          />
        </View>

        <Text style={styles.errorText}>{errorText}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              check() ? navigation.navigate("Menu") : null;
            }}
          >
            <Text style={styles.loginText}>Logg inn</Text>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => {
              check() ? navigation.navigate("Menu") : null;
            }}
          >
            <Text style={styles.signText}>Registrer deg</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    flex: 2,
    borderTopLeftRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
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
  signText: {
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#03A9F4",
    borderRadius: 30,
    backgroundColor: "white",
    height: 50,
    width: WIDTH - 60,
  },
  errorText: {
    color: "red",
  },
});
export default SignupScreen;
