import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../../components/CustomHeader";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const dummyData = [
  { name: "Matematikk R2", value: 6, oldValue: 5 },
  { name: "Biologi 1", value: 5, oldValue: 4 },
  { name: "Samfunnsfag", value: 3, oldValue: 2 },
  { name: "Engelsk", value: 3, oldValue: 1 },
];
const dummyData2 = [
  { name: "Matematikk R2", value: "MEROD" },
  { name: "Kjemi 2", value: "MEROD" },
  { name: "Samfunnsfag", value: "GENS" },
];
const dummyData3 = [
  { to: "Matematikk S2", from: "Matematikk R1" },
  { to: "Rettslære 1", from: "Naturfag" },
  { to: "Sosialkunnskap", from: "Geografi" },
];
const RecommendScreen = (props) => {
  return (
    <View style={GlobalStyles.container}>
      <View style={{ height: "5%" }} />
      <ScrollView>
        <Text style={GlobalStyles.underTitleText}>
          Coming soon... (kanskje)
        </Text>
      </ScrollView>
    </View>
  );
};

export default RecommendScreen;
{
  /* <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene kan du forbedre:(dummyData)
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {dummyData.map((item, index) => (
              <View key={item.name}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>
                      fra {item.oldValue} til {item.value}
                    </Text>
                  </View>
                </View>
                {index >= dummyData.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene trenger du:(dummyData)
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {dummyData2.map((item, index) => (
              <View key={item.name}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>{item.name}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>{item.value}</Text>
                  </View>
                </View>
                {index >= dummyData2.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={GlobalStyles.whiteContainer}>
          <Text style={GlobalStyles.underTitleText}>
            Disse fagene kan du bytte:(dummyData)
          </Text>
          <View style={GlobalStyles.greyContainer}>
            {dummyData3.map((item, index) => (
              <View key={item.to}>
                <View style={GlobalStyles.row}>
                  <Text style={GlobalStyles.listText}>fra {item.from}</Text>
                  <View style={GlobalStyles.listEndContainer}>
                    <Text style={GlobalStyles.listText}>til {item.to}</Text>
                  </View>
                </View>
                {index >= dummyData3.length - 1 ? null : (
                  <View style={GlobalStyles.ItemSeparatorComponent}></View>
                )}
              </View>
            ))}
          </View>
        </View> */
}
