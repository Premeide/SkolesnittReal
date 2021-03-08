import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";

const Overview = ({ navigation }) => {
  const [data, setData] = useState(dataFile);

  function RealandLanPoints() {
    let newRealPoints = 0;
    for (const [index, element] of data[3].value.entries()) {
      for (const [idx, ele] of allClasseslist.entries()) {
        if (element.id === ele.name) {
          if (ele.type === "r") {
            newRealPoints += 1;
          }
        }
      }
    }

    return newRealPoints;
  }
  function AgePoints() {
    let x = (2002 - data[1].value) * 2;
    x = Math.min(Math.max(parseInt(x), 0), 8);
    if (x > 0) {
      return x;
    }
    return 0;
  }
  function konkurransePoints() {
    let datadup = data[3].value;
    let gradesum = 0;
    let numofclasses = 0;
    for (const [index, element] of datadup.entries()) {
      gradesum += element.value + 1;
      numofclasses += 1;
      if (element.exam) {
        gradesum += element.exva + 1;
        numofclasses += 1;
      }
    }
    gradesum = (gradesum / numofclasses) * 10;
    gradesum += AgePoints();
    gradesum += RealandLanPoints();
    gradesum += data[2].value;
    return gradesum.toFixed(2);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>
            {" "}
            Født:
            <Text style={{ fontWeight: "bold" }}>{data[1].value}</Text>,
            interesse:
            <Text style={{ fontWeight: "bold" }}>{data[4].value}</Text>
            Linje:
            <Text style={{ fontWeight: "bold" }}>{data[5].value}</Text>
          </Text>
          <View style={styles.bubble}>
            <Text style={styles.txt}>{konkurransePoints()}</Text>
            <Text style={styles.txt2}>Dine konkurransepoeng</Text>
          </View>
          <View
            style={[
              styles.bubble,
              { height: 350, paddingVertical: 10, paddingHorizontal: 10 },
            ]}
          >
            <View style={styles.row}>
              <Icon name="wheelchair-alt" size={30} color="grey" />
              <Text style={styles.listtxt}> Alderspoeng</Text>
              <Text style={styles.num}>{AgePoints()}</Text>
            </View>
            <View style={styles.row}>
              <Icon2 name="person-add" size={30} color="grey" />
              <Text style={styles.listtxt}> Tilleggspoeng</Text>
              <Text style={styles.num}>{data[2].value}</Text>
            </View>
            <View style={styles.row}>
              <Icon2 name="school" size={30} color="grey" />
              <Text style={styles.listtxt}> Karaktersnitt</Text>
              <Text style={styles.num}>{(data[0].value / 10).toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Icon2 name="rocket-sharp" size={30} color="grey" />
              <Text style={styles.listtxt}> Real-/språkpoeng</Text>
              <Text style={styles.num}>{RealandLanPoints()}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="file-o" size={30} color="grey" />
              <Text style={styles.listtxt}> Antall fag</Text>
              <Text style={styles.num}>{data[3].value.length}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.txt}> {data[4].value}</Text>
        <Text style={styles.txt2}>krever {data[7].requirements}</Text>
        <Text>{data[7].requiredClasses}</Text>
        {dataFile[7].pointLimit.map((item) => {
          return (
            <View key={item.place}>
              <Text style={styles.txt}>
                {item.place}: {item.points}
              </Text>
            </View>
          );
        })}
        <Button
          title="ok"
          onPress={() => {
            console.log(data[7].requiredClasses);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#eaeaea",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  txt: {
    textAlign: "center",
    color: "#20232a",
    fontSize: 40,
    fontWeight: "bold",
  },
  num: {
    flex: 1,
    textAlign: "right",
    color: "#20232a",
    fontSize: 30,
    fontWeight: "bold",
    paddingRight: 10,
  },
  txt2: {
    textAlign: "center",
    color: "grey",
    fontSize: 15,
  },
  listtxt: {
    fontSize: 20,
    color: "#20232a",
  },
  bubble: {
    marginTop: 6,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#20232a",
    color: "#20232a",
    width: 370,
    height: 115,
  },
});
export default Overview;
