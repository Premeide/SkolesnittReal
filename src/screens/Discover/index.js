import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";
import { localData } from "../../assets/data/GlobalData";
import ArrowButton from "../../components/ArrowButton";

const DiscoverScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(localData.firstLogIn.value);
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const [searchFilterText, setSearchFilterText] = useState(
    require("../../assets/data/karaktergrense.json")
  );

  const searchFilter = (_txt) => {
    let txt = _txt.trim().toLowerCase();
    if (txt) {
      let newList = [];
      for (const [index, element] of karakterGrenser.entries()) {
        if (element.studienavn.toLowerCase().includes(txt)) {
          newList.push(element);
        }
      }
      setSearchFilterText(newList);
    } else {
      setSearchFilterText(karakterGrenser);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {localData.firstLogIn.value ? null : <View style={{ height: "5%" }} />}
      <View style={GlobalStyles.whiteContainer2}>
        <TextInput
          style={GlobalStyles.textInput2}
          placeholder="Søk utdanninger"
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={searchFilterText}
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
          <ArrowButton />
        </TouchableOpacity>
      ) : null}
      <Modal transparent={true} visible={showModal}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "stretch" }}
          onPress={() => {
            setShowModal(false);
          }}
        >
          <Image
            source={require("../../assets/images/Turorial_Discover.png")}
            style={{ flex: 1, width: null, height: null }}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DiscoverScreen;
