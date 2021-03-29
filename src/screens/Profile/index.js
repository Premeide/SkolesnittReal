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

let newProfileData = [
  { name: "Folkehøyskole" },
  { name: "Militæret" },
  { name: "30 studiepoeng" },
  { name: "60 studiepoeng" },
  { name: "23/5" },
];
let data2 = [
  { name: "Vanlige spørsmål", screen: "Questions" },
  { name: "Tilbakemelding", screen: "Feedback" },
  { name: "Om", screen: "About" },
  { name: "Logg ut", screen: "About" },
];

const ProfileScreen = ({ navigation }) => {
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
      <ScrollView>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>Fødselsår:</Text>
          <TextInput
            value={age}
            keyboardType="number-pad"
            placeholder="2000"
            style={GlobalStyles.textInput}
            onChangeText={(text) => setAge(text)}
          />
        </View>

        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>Tilleggspoeng:</Text>
          <View style={GlobalStyles.greyContainer}>
            {newProfileData.map((item, index) => (
              <View key={item.name}>
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
              {index >= data2.length - 1 ? null : (
                <View style={GlobalStyles.ItemSeparatorComponent}></View>
              )}
            </View>
          ))}
          {/* <TouchableOpacity
          style={GlobalStyles.row}
          onPress={() =>
            navigation.navigate("EducationDetails", {
              postStudiekode: item.studiekode,
            })
          }
        >
          <Text style={[GlobalStyles.listText, { width: "90%" }]}>
            {item.studienavn}
          </Text>
          <View style={GlobalStyles.listEndContainer}>
            <Icon name="angle-right" size={30} />
          </View>
        </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
