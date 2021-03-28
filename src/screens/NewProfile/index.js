import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData } from "../../assets/data/GlobalData";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";

let newProfileData = [
  { name: "Folkehøyskole" },
  { name: "Militæret" },
  { name: "30 studiepoeng" },
  { name: "60 studiepoeng" },
  { name: "23/5" },
];

const NewProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState();
  const [checkArray, setCheckArray] = useState([]);

  const selectThis = (index) => {
    let tempCheckArray = checkArray;
    console.log(index);
    if (checkArray.includes(index)) {
      tempCheckArray = tempCheckArray.filter((n) => {
        return n != index;
      });
    } else {
      tempCheckArray.push(index);
    }

    setCheckArray(tempCheckArray);
  };
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
        <TextInput
          value={age}
          keyboardType="number-pad"
          placeholder="2000"
          style={GlobalStyles.textInput}
          onChangeText={(text) => {}}
        />
      </View>

      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Tilleggspoeng:</Text>
        <View style={GlobalStyles.greyContainer}>
          <FlatList
            data={newProfileData}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => (
              <View style={GlobalStyles.ItemSeparatorComponent} />
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={GlobalStyles.row}
                onPress={() => selectThis(index)}
              >
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                <View style={GlobalStyles.listEndContainer}>
                  <CheckBox
                    value={checkArray.includes(index)}
                    onChange={() => {
                      selectThis(index);
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* <Button title="ok" onPress={() => console.log(checkArray)} /> */}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Discover")}
        style={GlobalStyles.customBtnContainer}
      >
        <CustomBtn text="Fortsett" />
      </TouchableOpacity>
    </View>
  );
};

export default NewProfileScreen;
