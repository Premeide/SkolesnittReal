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
];

const NewProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState();
  const [checkArray, setCheckArray] = useState([]);

  const test = React.useRef();

  function checkboxHandler(i) {
    if (checkArray.includes(i)) {
      return true;
    }
    return false;
  }
  const handleAgeChange = (t) => {
    setAge(t);
    if (t.length > 3) {
      test.current.blur();
      localData.born.value = t;
    }
  };
  const selectThis = (index) => {
    let tempCheckArray = checkArray;
    if (checkArray.includes(index)) {
      tempCheckArray = tempCheckArray.filter((n) => {
        return n != index;
      });
    } else {
      tempCheckArray.push(index);
    }

    setCheckArray(tempCheckArray);
    setAge(age);
  };
  const handleTilleggspoeng = (i) => {
    let points = 0;
    i == 0
      ? (localData.extraPoints.f = !localData.extraPoints.f)
      : i == 1
      ? (localData.extraPoints.m = !localData.extraPoints.m)
      : i == 2
      ? (localData.extraPoints.tre = !localData.extraPoints.tre)
      : i == 3
      ? (localData.extraPoints.seks = !localData.extraPoints.seks)
      : null;
    if (localData.extraPoints.tre) {
      points = 1;
    }
    if (
      localData.extraPoints.seks ||
      localData.extraPoints.m ||
      localData.extraPoints.f
    ) {
      points = 2;
    }
    localData.extraPoints.value = points;
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
        <TextInput
          value={age}
          ref={test}
          maxLength={4}
          keyboardType="number-pad"
          placeholder="2000"
          style={GlobalStyles.textInput}
          onChangeText={(text) => handleAgeChange(text)}
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
                onPress={() => {
                  selectThis(index);
                  handleTilleggspoeng(index);
                }}
              >
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                <View style={GlobalStyles.listEndContainer}>
                  <CheckBox
                    value={checkboxHandler(index)}
                    onPress={() => {
                      selectThis(index);
                      handleTilleggspoeng(index);
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Discover");
        }}
        style={GlobalStyles.customBtnContainer}
      >
        <CustomBtn text="Fortsett" />
      </TouchableOpacity>
    </View>
  );
};

export default NewProfileScreen;
