import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";
import { localData } from "../../assets/data/GlobalData";

const DiscoverScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const karakterGrenser = require("../../assets/data/karaktergrense.json");

  function searchFilter(txt) {
    if (txt) {
      let newList = [];
      for (const [index, element] of karakterGrenser.entries()) {
        if (element.studienavn.toLowerCase().includes(txt.toLowerCase())) {
          newList.push(element);
        }
      }
      return newList;
    }
    return karakterGrenser;
  }

  return (
    <View style={GlobalStyles.container}>
      {localData.firstLogIn.value ? null : <View style={{ height: "5%" }} />}
      <View style={GlobalStyles.whiteContainer2}>
        <TextInput
          style={GlobalStyles.textInput2}
          placeholder="Søk utdanninger"
          onChangeText={(text) => setInput(text)}
        />
        <FlatList
          data={searchFilter(input)}
          keyExtractor={(item) => item.studiekode.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={GlobalStyles.row}
              onPress={() =>
                navigation.navigate("EducationDetails", {
                  postStudiekode: item.studiekode,
                })
              }
            >
              <Text style={[GlobalStyles.listText, { width: "90%" }]}>
                {item.studienavn} ({item.lærerstedskode})
              </Text>
              <View style={GlobalStyles.listEndContainer}>
                <Icon name="angle-right" size={30} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {localData.firstLogIn.value ? (
        <TouchableOpacity
          onPress={() => {
            localData.firstLogIn.value = false;
            navigation.navigate("_Kalkulator");
          }}
          style={GlobalStyles.customBtnContainer}
        >
          <CustomBtn text="Ferdig" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default DiscoverScreen;
