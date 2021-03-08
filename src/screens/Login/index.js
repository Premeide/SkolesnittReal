import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData } from "../../assets/data/GlobalData";
import styles from "./styles";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState(" ");

  function login() {
    username && password
      ? localData.born.value == 2020
        ? navigation.navigate("Tab")
        : navigation.navigate("Tab")
      : setErrorText("Skriv inn bruker navn og passord.");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.jpg")}
        />
        <Text style={styles.title}>SkoleSnitt</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Icon name="user" style={styles.inputIcon} size={25} />
          <TextInput
            style={styles.input}
            placeholder="Brukernavn"
            placeholderTextColor="grey"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <Text> </Text>
        <View style={[styles.row]}>
          <Icon name="lock" style={styles.inputIcon} size={25} />
          <TextInput
            style={styles.input}
            placeholder="Passord"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Text style={styles.errorText}>{errorText}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => login()}>
            <Text style={styles.loginText}>Logg inn</Text>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signText}>Registrer deg</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
