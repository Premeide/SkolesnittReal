import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import CustomBtn from "../../components/CustomBtn";
// import qs from "qs";

// export async function sendEmail(to, subject, body, options = {}) {
//   const { cc, bcc } = options;

//   let url = `mailto:${to}`;

//   // Create email link query
//   const query = qs.stringify({
//     subject: subject,
//     body: body,
//     cc: cc,
//     bcc: bcc,
//   });

//   if (query.length) {
//     url += `?${query}`;
//   }

//   // check if we can use this link
//   const canOpen = await Linking.canOpenURL(url);

//   if (!canOpen) {
//     throw new Error("Provided URL can not be handled");
//   }

//   return Linking.openURL(url);
// }
// export const callNumber = (phone) => {
//   console.log("callNumber ----> ", phone);
//   let phoneNumber = phone;
//   if (Platform.OS !== "android") {
//     phoneNumber = `telprompt:${phone}`;
//   } else {
//     phoneNumber = `tel:${phone}`;
//   }
//   Linking.canOpenURL(phoneNumber)
//     .then((supported) => {
//       if (!supported) {
//         Alert.alert("Phone number is not available");
//       } else {
//         return Linking.openURL(phoneNumber);
//       }
//     })
//     .catch((err) => console.log(err));
// };
const FeedbackScreen = (props) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // function handleSendEmail(_subject, _description) {
  //   console.log("HANDLESENDEMAIL...");
  //   sendEmail(
  //     "premeide@gmail.com",
  //     "SKOLESNITT FEEDBACK: " + _subject,
  //     "Beste appen ever, men: " + _description
  //     //{ cc: 'user@domain.com; user2@domain.com; userx@domain1.com' }
  //   ).then(() => {
  //     console.log("Your message was successfully sent!");
  //   });
  // }
  // function handlePhoneLinking() {
  //   console.log("Handling phone linking..");
  //   callNumber("98006273");
  // }
  // function handleMapsLinking() {
  //   console.log("Handling Maps Linking..");
  //   const scheme = Platform.select({
  //     ios: "maps:0,0?q=",
  //     android: "geo:0,0?q=",
  //   });
  //   const latLng = `${60.51331},${5.29505}`;
  //   const label = "Custom Label";
  //   const url = Platform.select({
  //     ios: `${scheme}${label}@${latLng}`,
  //     android: `${scheme}${latLng}(${label})`,
  //   });
  //   Linking.openURL(url);
  // }
  // const handleInput = (text, container) => {
  //   container == "emne" ? setSubject(text) : setDescription(text);
  //   console.log(`HANDLINGINPUT for ${container}`);
  // };
  return (
    <View style={GlobalStyles.container}>
      {/* <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Emne:</Text>
        <TextInput
          placeholder="Teknisk feil, forslag"
          style={GlobalStyles.textInput}
          onChangeText={(text) => {
            handleInput(text, "emne");
          }}
        />
      </View>

      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>Beskrivelse:</Text>
        <TextInput
          placeholder="Veldig bra app"
          style={GlobalStyles.textInput}
          onChangeText={(text) => {
            handleInput(text, "beskrivelse");
          }}
        />
      </View>
      <View style={GlobalStyles.whiteContainer}>
        <Text style={GlobalStyles.underTitleText}>KONTAKTINFORMASJON:</Text>
        <TouchableOpacity onPress={handlePhoneLinking}>
          <Text style={GlobalStyles.listText}>
            <Text style={{ fontWeight: "bold" }}>Tlf:</Text> 98 00 62 73
          </Text>
        </TouchableOpacity>
        <Text style={GlobalStyles.listText}>
          <Text style={{ fontWeight: "bold" }}>Epost:</Text> premeide@gmail.com
        </Text>
        <TouchableOpacity onPress={handleMapsLinking}>
          <Text style={GlobalStyles.listText}>
            <Text style={{ fontWeight: "bold" }}>Besøksadresse:{"\n"}</Text>
            Olderkjerret 143, 5108 Hordvik
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePhoneLinking}>
          <Text style={GlobalStyles.listText}>
            <Text style={{ fontWeight: "bold" }}>Organisasjonsnr.</Text> 980 06
            273
          </Text>
        </TouchableOpacity>
        <Text style={{ fontStyle: "italic" }}>
          {"\n"}Copyright © 2021 SkoleSnitt AS Inc.{"\n"}All rights reserved.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleSendEmail(subject, description);
        }}
        style={GlobalStyles.customBtnContainer}
      >
        <CustomBtn text="Send Email" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedbackScreen;
