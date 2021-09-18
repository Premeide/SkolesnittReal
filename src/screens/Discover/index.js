import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import { localData } from "../../assets/data/GlobalData";
import { useIsFocused } from "@react-navigation/native";

const DiscoverScreen = ({ navigation }) => {
  const isFocused = useIsFocused(); //useeffect emptyarrray gjør jobben kansj
  const karakterGrenser = require("../../assets/data/karaktergrense.json");
  const [searchFilterText, setSearchFilterText] = useState(
    require("../../assets/data/karaktergrense.json")
  );

  function isEdAdded(kode) {
    if (localData.wantedEducations.studiekode.includes(kode)) return true;
    else return false;
  }
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
      <View style={GlobalStyles.whiteContainer2}>
        <View style={{ height: localData.firstLogIn.value ? "1%" : "7%" }} />
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
              <Text
                style={[
                  GlobalStyles.listText,
                  {
                    width: "90%",
                    fontWeight: isEdAdded(item.studiekode) ? "bold" : "100",
                  },
                ]}
              >
                {item.studienavn} ({item.lærerstedskode})
              </Text>
              <View style={GlobalStyles.listEndContainer}>
                <Icon name="angle-right" size={30} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default DiscoverScreen;
