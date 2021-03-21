import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import { localData } from "../../assets/data/GlobalData";
import ExtraPoints from "../../components/ExtraPoints";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";

const NewProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState();
  const [extraPoints, setExtraPoints] = useState();
  const [retakeNow, setEetakeNow] = useState();
  const [retakeLater, setRetakeLater] = useState();
  const [interests, setInterests] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const toggleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Fyll inn boksene under</Text>
        <View style={styles.bubbleContainer}>
          <Icon name="wheelchair-alt" style={styles.icon} size={25} />
          <TextInput
            style={styles.placeholder}
            placeholder="Min alder"
            placeholderTextColor="grey"
            onChangeText={(text) => {
              setAge(text);
              localData.born.value = text;
            }}
            onEndEditing={null}
            value={age}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View style={styles.bubbleContainer}>
          <Icon2 name="document-text-sharp" style={styles.icon} size={25} />
          <View>
            <Text
              style={[
                styles.placeholder,
                { color: "black", fontWeight: "bold" },
              ]}
            >
              Tilleggspoeng
            </Text>
            <ExtraPoints />
          </View>
        </View>
        <TouchableOpacity
          style={styles.bubbleContainer}
          onPress={() => navigation.navigate("RetakeKalkulator")}
        >
          <Icon2 name="document-text-sharp" style={styles.icon} size={25} />
          <View>
            <Text
              style={[
                styles.placeholder,
                { color: "black", fontWeight: "bold" },
              ]}
            >
              Fag jeg tar opp/skal ta opp
            </Text>
            {localData.retakeClasses.map((subject) => (
              <View style={styles.listContainer} key={subject.id}>
                <Text style={styles.listtxt} numberOfLines={1}>
                  {subject.id}
                </Text>
                <Text style={{ textAlign: "right" }}>{subject.value}</Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}>
            <Icon name="angle-right" size={25} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bubbleContainer}
          // onPress={() => navigation.navigate("Utforsk")}
        >
          <Icon2 name="document-text-sharp" size={25} />
          <View>
            <Text
              style={[
                styles.placeholder,
                { color: "black", fontWeight: "bold" },
              ]}
            >
              Jeg ønsker å studere dette
            </Text>
            {localData.wantedEducations.names.map((education) => (
              <View style={styles.listContainer} key={education}>
                <Text style={styles.listtxt} numberOfLines={1}>
                  {education}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}>
            <Icon name="angle-right" size={25} />
          </View>
        </TouchableOpacity>

        <View style={styles.bubbleContainer}>
          <CheckBox
            value={checkbox}
            onChange={toggleCheckbox}
            style={styles.icon}
          />
          <View>
            <Text
              style={[
                styles.placeholder,
                { color: "black", fontWeight: "bold" },
              ]}
            >
              Jeg søker med 23/5 regelen
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
          ></View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Tab", { screen: "Kalkulator" })}
          style={styles.btnContainer}
        >
          <Text style={styles.btn}>Fortsett</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewProfileScreen;

{
  /* <Modal transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={ToggleModal}
            style={styles.bubbleContainer}
          >
            <Icon name="wheelchair-alt" style={styles.icon} size={25} />
            <Text style={[styles.placeholder, { color: "grey" }]}>
              {age ? age : "Alder"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>


// <Text style={styles.title}>Fyll inn boksene under</Text>
//       <View style={styles.row}>
//         <Icon name="wheelchair-alt" style={styles.inputIcon} size={25} />
//         <TextInput
//           style={styles.input}
//           placeholder="Min alder"
//           placeholderTextColor="grey"
//           onChangeText={(text) => {
//             ageSet(parseInt(text));
//           }}
//           onEndEditing={() => null}
//           value={age}
//           keyboardType="numeric"
//         />
//       </View>
//       <Text> </Text>
//       <View style={styles.row}>
//         <Icon name="user" style={styles.inputIcon} size={25} />
//         <TouchableOpacity>
//           <TextInput
//             style={styles.input}
//             placeholder="Jeg vil studere"
//             placeholderTextColor="grey"
//             onChangeText={(text) => {
//               interestSet(text);
//               showList1(true);
//             }}
//             onEndEditing={() => null}
//             value={interest}
//           />
//         </TouchableOpacity>
//       </View>
//       {list1 ? (
//         <FlatList
//           data={directionlist}
//           keyExtractor={(item) => item.name}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 interestSet(item.name);
//                 showList1(false);
//               }}
//             >
//               <Text style={styles.listTxt}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <Text> </Text>
//       )}
//       <View style={styles.row}>
//         <Icon2 name="document-text-sharp" style={styles.inputIcon} size={25} />
//         <TouchableOpacity
//           onPress={() => {
//             showProfile(!profile);
//           }}
//         >
//           <Text style={styles.inputBtn}>Text</Text>
//         </TouchableOpacity>
//       </View>
//       {/* {profile ? <ProfileScreen /> : <Text> </Text>} */
}
//       <View style={styles.row}>
//         <Icon2 name="list" style={styles.inputIcon} size={25} />
//         <TextInput
//           style={styles.input}
//           placeholder="Hvilken linje har gått"
//           placeholderTextColor="grey"
//           onChangeText={(text) => {
//             lineSet(text);
//             showList2(true);
//             showProfile(false);
//           }}
//           value={line}
//         />
//       </View>
//       {list2 ? (
//         <FlatList
//           data={directionlist2}
//           keyExtractor={(item) => item.name}
//           ListFooterComponent={() => <Text style={{ fontSize: 25 }}> </Text>}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 lineSet(item.name);
//                 showList2(false);
//               }}
//             >
//               <Text style={styles.listTxt}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <Text> </Text>
//       )}
//       <View style={styles.btnContainer}>
//         <TouchableOpacity onPress={() => null}>
//           <Text style={styles.btnText}>Fortsett</Text>
//         </TouchableOpacity>
//       </View>
