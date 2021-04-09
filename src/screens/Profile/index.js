import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "./styles";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData } from "../../assets/data/GlobalData";
import { Alert } from "react-native";

let newProfileData = [
  { name: "Folkehøyskole" },
  { name: "Militæret" },
  { name: "30 til 59 studiepoeng" },
  { name: "60 studiepoeng" },
];
let data2 = [
  { name: "Vanlige spørsmål", screen: "Questions" },
  { name: "Tilbakemelding", screen: "Feedback" },
  { name: "Om", screen: "About" },
];

const ProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState(localData.born.value.toString());
  const [checkArray, setCheckArray] = useState(initcheckarray());
  const [extraPoints, setExtraPoints] = useState(0); // for forceUpdate

  const test = React.useRef();

  function addFunc(total, num) {
    return total + num;
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
  };
  function initcheckarray() {
    let a = [];
    localData.extraPoints.f ? a.push(1) : null;
    localData.extraPoints.m ? a.push(2) : null;
    localData.extraPoints.tre ? a.push(3) : null;
    localData.extraPoints.seks ? a.push(4) : null;
    return a;
  }
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
    setExtraPoints(checkArray.reduce(addFunc)); //for forceUpdate
  };
  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
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
            {newProfileData.map((item, index) => (
              <View key={item.name}>
                <TouchableOpacity
                  style={GlobalStyles.row}
                  onPress={() => {
                    selectThis(index + 1);
                    handleTilleggspoeng(index);
                  }}
                >
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    {checkArray.includes(index + 1) ? (
                      <Icon name="check-square" size={25} />
                    ) : (
                      <Icon name="square" size={25} />
                    )}
                  </View>
                </TouchableOpacity>
                {index >= newProfileData.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          {data2.map((item, index) => (
            <View key={item.name}>
              <TouchableOpacity
                style={GlobalStyles.row}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                <View style={GlobalStyles.listEndContainer}>
                  <Icon name="angle-right" size={30} />
                </View>
              </TouchableOpacity>
              <View style={GlobalStyles.ItemSeparatorComponent}></View>
            </View>
          ))}
          <Text
            style={[GlobalStyles.listText, { color: "red" }]}
            onPress={() => {
              Alert.alert("Logg ut?", "Bro, du logget aldri inn...", [
                {
                  text: "Oja, lol",
                },
                { text: "sry" },
              ]);
            }}
          >
            Logg ut
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
