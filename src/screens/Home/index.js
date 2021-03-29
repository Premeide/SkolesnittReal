import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { localData } from "../../assets/data/GlobalData";
import styles from "./styles";
import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import SegmentedControl from "rn-segmented-control";

const HomeScreen = ({ navigation }) => {
  let [data1, setData1] = useState([
    { name: "Alderspoeng", value: 5 },
    { name: "Tilleggspoeng", value: 4 },
    { name: "Real- og språkpoeng", value: 3 },
  ]);

  const [activeSegment, setActiveSegment] = useState(0);

  const handleSegmentedControl = (i) => {
    setActiveSegment(i);
  };
  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <CustomHeader />
        <View style={GlobalStyles.whiteContainer}>
          <SegmentedControl
            tabs={["Skole", "Konkurranse", "23/5"]}
            textStyle={{ fontSize: 15 }}
            currentIndex={activeSegment}
            onChange={(index) => handleSegmentedControl(index)}
            paddingVertical={3}
            segmentedControlBackgroundColor="gainsboro"
            activeSegmentBackgroundColor="white"
            activeTextColor="black"
            activeTextWeight="bold"
            textColor="black"
          />
          <Text style={styles.poeng}>56,3</Text>
          <View style={GlobalStyles.greyContainer}>
            {data1.map((item, index) => (
              <View key={item.name}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>5</Text>
                  </View>
                </View>
                {index >= data1.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene skal jeg ta opp:
          </Text>
          <TouchableOpacity
            style={GlobalStyles.greyContainer}
            onPress={() => navigation.navigate("RetakeKalkulator")}
          >
            {localData.retakeClasses.map((item, index) => (
              <View key={item.id}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.id}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>{item.value}</Text>
                  </View>
                </View>
                {index >= localData.retakeClasses.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </TouchableOpacity>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>Mine utdanninger:</Text>
          <View style={GlobalStyles.greyContainer}>
            {localData.wantedEducations.names.map((item, index) => (
              <View key={item}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>60.0</Text>
                  </View>
                </View>
                {index >= localData.wantedEducations.names.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={{ fontSize: 50 }}></Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
