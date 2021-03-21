import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordb, setPasswordb] = useState();
  const [errorText, setErrorText] = useState(" ");

  function check() {
    let tempError = "";
    let tempReturn = true;
    username && password && passwordb
      ? null
      : (tempError = "Fyll inn brukernavn og passord");
    setErrorText(tempError);
    tempError.length === 0 ? (tempReturn = true) : (tempReturn = false);
    return tempReturn;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.jpg")}
        />
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
              check() ? navigation.navigate("NewProfile") : null;
            }}
          >
            <Text style={styles.loginText}>Logg inn</Text>
          </TouchableOpacity>
          <Text> </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
