import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { dataFile, directionlist, directionlist2 } from "../dataFile";
import * as Animatable from "react-native-animatable";
import ProfileScreen from "./profileScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";

const { width: WIDTH } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [age, ageSet] = useState(dataFile[1].value);
  const [interest, interestSet] = useState(dataFile[4].value);
  const [line, lineSet] = useState(dataFile[5].value);
  const [list1, showList1] = useState(false);
  const [list2, showList2] = useState(false);
  const [profile, showProfile] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fyll inn boksene under</Text>
      <View style={styles.row}>
        <Icon name="wheelchair-alt" style={styles.inputIcon} size={25} />
        <TextInput
          style={styles.input}
          placeholder="Min alder"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            ageSet(parseInt(text));
            dataFile[1].value = text;
          }}
          onEndEditing={() => null}
          value={age}
          keyboardType="numeric"
        />
      </View>
      <Text> </Text>
      <View style={styles.row}>
        <Icon name="user" style={styles.inputIcon} size={25} />
        <TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Jeg vil studere"
            placeholderTextColor="grey"
            onChangeText={(text) => {
              interestSet(text);
              showList1(true);
              dataFile[1].value = text;
            }}
            onEndEditing={() => null}
            value={interest}
          />
        </TouchableOpacity>
      </View>
      {list1 ? (
        <FlatList
          data={directionlist}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                interestSet(item.name);
                dataFile[4].value = item.name;
                dataFile[7].requiredClasses = item.requiredClasses;
                dataFile[7].requirements = item.requirements;
                dataFile[7].pointLimit = item.pointLimit;
                showList1(false);
              }}
            >
              <Text style={styles.listTxt}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text> </Text>
      )}
      <View style={styles.row}>
        <Icon2 name="document-text-sharp" style={styles.inputIcon} size={25} />
        <TouchableOpacity
          onPress={() => {
            showProfile(!profile);
          }}
        >
          <Text style={styles.inputBtn}>
            {dataFile[2].value
              ? "jeg har " + dataFile[2].value + " tilleggspoeng"
              : "Jeg har tilleggspoeng"}
          </Text>
        </TouchableOpacity>
      </View>
      {profile ? <ProfileScreen /> : <Text> </Text>}
      <View style={styles.row}>
        <Icon2 name="list" style={styles.inputIcon} size={25} />
        <TextInput
          style={styles.input}
          placeholder="Hvilken linje har gått"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            lineSet(text);
            showList2(true);
            showProfile(false);
          }}
          value={line}
        />
      </View>
      {list2 ? (
        <FlatList
          data={directionlist2}
          keyExtractor={(item) => item.name}
          ListFooterComponent={() => <Text style={{ fontSize: 25 }}> </Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                lineSet(item.name);
                dataFile[5].value = item.name;
                showList2(false);
              }}
            >
              <Text style={styles.listTxt}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text> </Text>
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Fylke");
          }}
        >
          <Text style={styles.btnText}>Fortsett</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#03A9F4",
    fontWeight: "bold",
    paddingVertical: 20,
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

  inputBtn: {
    paddingTop: 10,
    height: 45,
    width: WIDTH - 40,
    borderRadius: 40,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "white",
    color: "grey",
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
    paddingBottom: 20,
  },
  btnText: {
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
  listTxt: {
    paddingLeft: 0,
    fontSize: 18,
    color: "black",
    backgroundColor: "gainsboro",
  },
});
export default HomeScreen;
