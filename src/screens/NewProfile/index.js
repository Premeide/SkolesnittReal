import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { localData } from "../../assets/data/GlobalData";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import ArrowButton from "../../components/ArrowButton";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

let newProfileData = [
  { name: "Folkehøyskole" },
  { name: "Militæret" },
  { name: "30 til 59 studiepoeng" },
  { name: "60 studiepoeng" },
  { name: "Ingen av disse" },
];

const NewProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState();
  const [showArrow, setShowArrow] = useState(false);
  const [checkArray, setCheckArray] = useState([]);
  const [extraPoints, setExtraPoints] = useState(0); // for forceUpdate
  const [showPoints, setShowPoints] = useState(false); //useState(new Animated.Value(0))[0];
  const ageInputRef = React.useRef();
  const isFocused = useIsFocused(); //useeffect emptyarrray gjør jobben kansj

  useEffect(() => {
    if (!showArrow) ageInputRef.current.focus();
  }, [isFocused]);

  const handleAgeChange = (t) => {
    setAge(t);
    if (t.length > 3) {
      ageInputRef.current.blur();
      setShowPoints(true);
      localData.yearOfBirth = t;
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
      tempCheckArray = tempCheckArray.filter((n) => {
        return n != 5;
      });
    }
    if (index == 5) {
      tempCheckArray = [5];
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
    if (i == 4) {
      points = 0;
      localData.extraPoints.f =
        localData.extraPoints.m =
        localData.extraPoints.tre =
        localData.extraPoints.seks =
          false;
    }
    localData.extraPoints.value = points;
    setExtraPoints(points);
  };

  return (
    <View style={GlobalStyles.container}>
      <Animatable.View
        style={GlobalStyles.whiteContainer}
        animation="fadeInUp"
        duration={700}
      >
        <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
        <TextInput
          value={age}
          ref={ageInputRef}
          maxLength={4}
          keyboardType="number-pad"
          placeholder="2021"
          style={GlobalStyles.textInput}
          onChangeText={(text) => handleAgeChange(text)}
        />
      </Animatable.View>

      {showPoints ? (
        <Animatable.View
          style={GlobalStyles.whiteContainer}
          animation="fadeInUp"
          duration={700}
        >
          <Text style={GlobalStyles.underTitleText}>
            Tilleggspoeng: {extraPoints}
          </Text>
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
                    setShowArrow(true);
                  }}
                >
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    {checkArray.includes(index + 1) ? (
                      <FontAwesome5
                        name={"check-circle"}
                        size={25}
                        color="black"
                      />
                    ) : (
                      <FontAwesome5 name={"circle"} size={25} color="black" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Animatable.View>
      ) : null}

      {showArrow ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("_Kalkulator");
          }}
          style={GlobalStyles.customBtnContainer}
        >
          <ArrowButton />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default NewProfileScreen;
