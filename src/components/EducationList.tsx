import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { IEducation } from "../assets/data/Interfaces";
import { useIsFocused } from "@react-navigation/native";

interface EducationListProps {
  navigation: any;
  educations: number[];
}

const KARAKTERGRENSER = require("../assets/data/karaktergrense.json");

const EducationList: React.FC<EducationListProps> = (props) => {
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState("");

  function isAdded(kode: number) {
    if (props.educations.includes(kode)) return true;
    return false;
  }

  function searchFilter(s: string, l: IEducation[]) {
    if (s == "") return l;
    return l.filter((v: any) =>
      v.studienavn.toLowerCase().includes(s.toLowerCase())
    );
  }
  return (
    <SafeAreaView style={GlobalStyles.safeContainer}>
      <View style={GlobalStyles.whiteContainer2}>
        <TextInput
          style={GlobalStyles.textInput2}
          placeholder="Søk utdanninger"
          onChangeText={(text) => setSearchText(text)}
        />
        <FlatList
          data={searchFilter(searchText, KARAKTERGRENSER)}
          keyExtractor={(item) => item.studiekode.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={GlobalStyles.ItemSeparatorComponent} />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={GlobalStyles.row}
              onPress={() =>
                props.navigation.navigate("EducationDetails", {
                  studiekode: item.studiekode,
                })
              }
            >
              <Text
                style={[
                  GlobalStyles.listText,
                  {
                    width: "90%",
                    fontWeight: isAdded(item.studiekode) ? "bold" : undefined,
                  },
                ]}
              >
                {item.studienavn} ({item.lærerstedskode})
              </Text>
              <View style={GlobalStyles.listEndContainer}>
                <FontAwesome5 name="angle-right" size={30} color="grey" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {
    educations: state.educations,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    setEducations: (studiekode: number) =>
      dispatch({ type: "SET_EDUCATIONS", payload: studiekode }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EducationList);
