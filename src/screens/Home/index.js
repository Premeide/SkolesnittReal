import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import { localData } from "../../assets/data/GlobalData";
import CustomHeader from "../../components/CustomHeader";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const [skolepoeng, setSkolepoeng] = useState(50.1);
  const [agePoints, setAgePoints] = useState(2);
  const [extraPoints, setExtraPoints] = useState(1);
  const [realPoints, setRealPoints] = useState(4);
  const [average, setAverage] = useState(3.4);
  const [numOfClasses, setNumOfClasses] = useState(15);

  const updateValues = () => {
    let gradesSum = 0;
    let numOfExams = 0;
    let _agePoints = (2002 - localData.born.value) * 2;
    let _numofClasses = localData.grades.value.length;
    for (const [idx, ele] of localData.grades.value.entries()) {
      gradesSum += ele.value + 1;
      if (ele.exam) {
        gradesSum += ele.exva + 1;
        numOfExams += 1;
      }
    }
    setAgePoints(_agePoints);
    setNumOfClasses(_numofClasses);
    setSkolepoeng(((gradesSum * 10) / (_numofClasses + numOfExams)).toFixed(2));
    setAverage((gradesSum / (_numofClasses + numOfExams)).toFixed(1));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#1e90ff",
        }}
      >
        <View
          style={[
            styles.row,
            {
              marginTop: "12%",
              justifyContent: "space-between",
            },
          ]}
        >
          <Icon name="bars" size={30} color="white" style={styles.hamburger} />
          <Text style={styles.title}>SKOLESNITT</Text>
          <Text style={{ marginRight: "6%" }}></Text>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: "#eaeaea" }}></View>

      <TouchableOpacity
        style={[styles.bubbleContainer, { top: "15%" }]}
        onPress={() => navigation.navigate("NewProfile")}
      >
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon name="address-book" size={35} color="white" />
          </View>
          <View>
            <Text style={styles.utitle}>Skolepoeng</Text>
            <Text style={styles.utext}>skolepoeng</Text>
          </View>
          <View style={styles.angleIconContainer}>
            <Icon name="angle-right" size={30} style={styles.angleIcon} />
          </View>
        </View>
        <Text style={styles.utext2}>Alderspoeng: 0</Text>
        <Text style={styles.utext2}>Tilleggspoeng: 0</Text>
        <Text style={styles.utext2}>Real-/språkpoeng: 0</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bubbleContainer, { top: "45%" }]}
        onPress={() => navigation.navigate("Kalkulator")}
      >
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon name="align-left" size={35} color="white" />
          </View>
          <View>
            <Text style={styles.utitle}>Dine fag</Text>
            <Text style={styles.utext}>Se dine fag</Text>
          </View>
          <View style={styles.angleIconContainer}>
            <Icon name="angle-right" size={30} style={styles.angleIcon} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bubbleContainer, { top: "60%" }]}
        onPress={() => navigation.navigate("Recommend")}
      >
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon name="blind" size={35} color="white" />
          </View>
          <View>
            <Text style={styles.utitle}>Hvordan øke snittet</Text>
            <Text style={styles.utext}>Se hvordan øke snittet</Text>
          </View>
          <View style={styles.angleIconContainer}>
            <Icon name="angle-right" size={30} style={styles.angleIcon} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bubbleContainer, { top: "75%" }]}
        onPress={() => navigation.navigate("Utforsk")}
      >
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon name="book" size={35} color="white" />
          </View>
          <View>
            <Text style={styles.utitle}>Utdanning</Text>
            <Text style={styles.utext}>Velg utdanninger</Text>
          </View>
          <View style={styles.angleIconContainer}>
            <Icon name="angle-right" size={30} style={styles.angleIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

// function RealandLanPoints() {
//   let newRealPoints = 0;
//   for (const [index, element] of data[3].value.entries()) {
//     for (const [idx, ele] of allClasseslist.entries()) {
//       if (element.id === ele.name) {
//         if (ele.type === "r") {
//           newRealPoints += 1;
//         }
//       }
//     }
//   }

//   return newRealPoints;
// }
// function AgePoints() {
//   let x = (2002 - data[1].value) * 2;
//   x = Math.min(Math.max(parseInt(x), 0), 8);
//   if (x > 0) {
//     return x;
//   }
//   return 0;
// }
// function konkurransePoints() {
//   let datadup = data[3].value;
//   let gradesum = 0;
//   let numofclasses = 0;
//   for (const [index, element] of datadup.entries()) {
//     gradesum += element.value + 1;
//     numofclasses += 1;
//     if (element.exam) {
//       gradesum += element.exva + 1;
//       numofclasses += 1;
//     }
//   }
//   gradesum = (gradesum / numofclasses) * 10;
//   gradesum += AgePoints();
//   gradesum += RealandLanPoints();
//   gradesum += data[2].value;
//   return gradesum.toFixed(2);
// }

{
  /* <View style={{ alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>
            Født:
            <Text style={{ fontWeight: "bold" }}>0</Text>, interesse:
            <Text style={{ fontWeight: "bold" }}>0</Text>
            Linje:
            <Text style={{ fontWeight: "bold" }}>0</Text>
          </Text>
          <View style={styles.bubble}>
            <Text style={styles.txt}>0</Text>
            <Text style={styles.txt2}>Dine konkurransepoeng</Text>
          </View>
          <View
            style={[
              styles.bubble,
              { height: 250, paddingVertical: 10, paddingHorizontal: 10 },
            ]}
          >
            <View style={styles.row}>
              <Icon name="wheelchair-alt" size={30} color="grey" />
              <Text style={styles.listtxt}> Alderspoeng</Text>
              <Text style={styles.num}>0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.listtxt}> Tilleggspoeng</Text>
              <Text style={styles.num}>0</Text>
            </View>
            <View style={styles.row}>

              <Text style={styles.listtxt}> Karaktersnitt</Text>
              <Text style={styles.num}>0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.listtxt}> Real-/språkpoeng</Text>
              <Text style={styles.num}>0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.listtxt}> Antall fag</Text>
              <Text style={styles.num}>0</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Tar opp</Text>
          {localData.retakeClasses.map((subject) => (
            <View key={subject.id} style={styles.row}>
              <Text style={styles.listtxt}>{subject.id}</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>
                Går for: {subject.try}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.title}>Skal ta opp</Text>
          {localData.retakeClasses.map((subject) => (
            <View key={subject.id} style={styles.row}>
              <Text style={styles.listtxt}>{subject.id}</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>
                Går for: {subject.try}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.bubble}>
          <Text style={styles.txt}>53.1</Text>
          <Text style={styles.txt2}>skolepoeng etterpå</Text>
        </View>
        <View>
          <Text style={styles.title}>Poenggrenser</Text>
          {localData.wantedEducations.names.map((subject) => (
            <View key={subject} style={styles.row}>
              <Text style={styles.listtxt}>{subject}</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>54,1</Text>
            </View>
          ))}
        </View> */
}
//<ScrollView style={{ marginTop: 35 }}>
//   {/* <CustomHeader /> */}

//   <View style={styles.container}>
//     {/* <Button
//       title="sdadad"
//       onPress={navigation.navigate("NewProfile")}
//     /> */}

//     <View style={styles.bubbleContainer}>
//       <View style={styles.row}>
//         <Text style={styles.title}>
//           Du har{" "}
//           <Text style={{ color: "grey", fontSize: 40 }}>{skolepoeng}</Text>{" "}
//           skolepoeng
//         </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("NewProfile")}>
//           <Icon name="pencil" size={25} style={styles.penIcon} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <Icon name="wheelchair-alt" size={30} color="grey" />
//         <Text style={styles.midText}> Alderspoeng</Text>
//         <Text style={styles.num}>{agePoints}</Text>
//       </View>
//       <View style={styles.row}>
//         <Icon name="file-o" size={30} color="grey" />
//         <Text style={styles.midText}> Tilleggspoeng</Text>
//         <Text style={styles.num}>{extraPoints}</Text>
//       </View>
//       <View style={styles.row}>
//         <Icon2 name="rocket-sharp" size={30} color="grey" />
//         <Text style={styles.midText}> Real- og språkpoeng</Text>
//         <Text style={styles.num}>{realPoints}</Text>
//       </View>
//       <View style={styles.row}>
//         <Icon2 name="school" size={30} color="grey" />
//         <Text style={styles.midText}> Karaktersnitt</Text>
//         <Text style={styles.num}>{average}</Text>
//       </View>
//       <View style={styles.row}>
//         <Icon2 name="person-add" size={30} color="grey" />
//         <Text style={styles.midText}> Antallfag</Text>
//         <Text style={styles.num}>{numOfClasses}</Text>
//       </View>
//     </View>

//     <View style={styles.bubbleContainer}>
//       {/* <Icon2 name="document-text-sharp" style={styles.icon} size={25} /> */}
//       <View style={styles.row}>
//         <Text style={styles.title}>Tar opp</Text>

//         <TouchableOpacity
//           onPress={() => navigation.navigate("RetakeKalkulator")}
//         >
//           <Icon name="pencil" size={25} style={styles.penIcon} />
//         </TouchableOpacity>
//       </View>
//       {localData.retakeClasses.map((subject) => (
//         <View style={styles.listContainer} key={subject.id}>
//           <Text style={styles.listtxt} numberOfLines={1}>
//             {subject.id}
//           </Text>
//           <Text style={[styles.num, { textAlign: "right" }]}>
//             {subject.value}
//           </Text>
//         </View>
//       ))}
//       <Text style={styles.title}>
//         Du får da <Text style={{ color: "grey", fontSize: 40 }}>53.2</Text>{" "}
//         skolepoeng
//       </Text>
//     </View>

//     <View style={styles.bubbleContainer}>
//       {/* <Icon2 name="document-text-sharp" style={styles.icon} size={25} /> */}
//       <View style={styles.row}>
//         <Text style={styles.title}>Utdanninger</Text>

//         <TouchableOpacity onPress={() => navigation.navigate("Utforsk")}>
//           <Icon name="pencil" size={25} style={styles.penIcon} />
//         </TouchableOpacity>
//       </View>
//       {localData.wantedEducations.names.map((subject) => (
//         <View style={styles.listContainer} key={subject}>
//           <Text
//             style={[styles.listtxt, { width: "87%" }]}
//             numberOfLines={1}
//           >
//             {subject}
//           </Text>
//           <Text style={[styles.num, { textAlign: "right" }]}>60.2</Text>
//         </View>
//       ))}
//     </View>
//     <Button
//       title="Aboutscreen"
//       onPress={() => navigation.navigate("About")}
//     />
//     <Button title="Update Button" onPress={updateValues} />
//   </View>
// </ScrollView>
