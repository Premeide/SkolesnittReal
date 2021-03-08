import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { dataFile } from "../dataFile";

const list = [
  { name: "Studievelger" },
  { name: "Profile" },
  { name: "Universiterer og høyskoler" },
  { name: "Fylke" },
  { name: "Poeng" },
  { name: "Fagområder" },
  { name: "Kalkulator" },
  { name: "Om" },
];

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.image}
      >
        <Text style={styles.title}> </Text>

        <TouchableOpacity>
          <View style={styles.bubble}>
            <Text style={styles.søk}>
              <Icon name="search" size={20} color="grey" />
              Søk utdanning
            </Text>
          </View>
        </TouchableOpacity>

        <FlatList
          ItemSeparatorComponent={() => null}
          data={list}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
              <View style={styles.row}>
                <Text style={styles.listtxt}> {item.name}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Feather name="arrow-right" size={30} color="grey" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    paddingTop: 100,
  },
  søk: {
    textAlign: "center",
    color: "grey",
    fontSize: 20,
  },
  bubble: {
    alignSelf: "center",
    marginTop: 6,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "white",
    borderColor: "white",
    width: 330,
    height: 35,
  },
  listtxt: {
    paddingVertical: 15,
    color: "black",
    fontSize: 20,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 6,
  },
});
export default MenuScreen;
