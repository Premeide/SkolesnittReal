import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
  Switch,
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
  { name: "30 til 59 studiepoeng" },
  { name: "60 studiepoeng" },
];

const NewProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState();
  const [checkArray, setCheckArray] = useState([]);
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
      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
        <TextInput
          value={age}
          ref={test}
          maxLength={4}
          keyboardType="number-pad"
          placeholder="2021"
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
                  selectThis(index + 1);
                  handleTilleggspoeng(index);
                }}
              >
                <Text style={GlobalStyles.listText}>{item.name}</Text>
                <View style={GlobalStyles.listEndContainer}>
                  {/* <CheckBox
                    value={checkArray.includes(index + 1)}
                    onPress={() => {
                      selectThis(index + 1);
                      handleTilleggspoeng(index);
                    }}
                  /> */}
                  {checkArray.includes(index + 1) ? (
                    <Icon name="check-square" size={25} />
                  ) : (
                    <Icon name="square" size={25} />
                  )}
                  {/* <Switch
                    trackColor={{ false: "grey", true: "grey" }}
                    thumbColor={"blue"}
                    onChange={() => {
                      selectThis(index);
                      handleTilleggspoeng(index);
                      setForce(4);
                    }}
                    value={checkArray.includes(index)}
                  /> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* <Button
          title="ok"
          onPress={() =>
            console.log(localData.extraPoints.value, "Arr: ", checkArray)
          }
        /> */}
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
