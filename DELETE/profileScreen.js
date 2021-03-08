import React from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import styles from "./styles";

const ProfileScreen = () => {
  const [m, setM] = React.useState(dataFile[6].m); // switch
  const [f, setF] = React.useState(dataFile[6].f); // switch
  const [tre, setTre] = React.useState(dataFile[6].tre); // switch
  const [seks, setSeks] = React.useState(dataFile[6].seks); // switch
  const toggleSwitchM = () => {
    setM((previousState) => !previousState);
    dataFile[6].m = !m;

    !m || f || seks ? updatePoints(2) : tre ? updatePoints(1) : updatePoints(0);
  };
  const toggleSwitchF = () => {
    setF((previousState) => !previousState);

    dataFile[6].f = !f;
    m || !f || seks ? updatePoints(2) : tre ? updatePoints(1) : updatePoints(0);
  };
  const toggleSwitchTre = () => {
    setTre((previousState) => !previousState);
    dataFile[6].tre = !tre;

    seks ? setSeks((previousState) => !previousState) : null;
    m || f || seks ? updatePoints(2) : !tre ? updatePoints(1) : updatePoints(0);
  };
  const toggleSwitchSeks = () => {
    setSeks((previousState) => !previousState);
    dataFile[6].seks = !seks;

    tre ? setTre((previousState) => !previousState) : null;
    m || f || !seks ? updatePoints(2) : tre ? updatePoints(1) : updatePoints(0);
  };
  const updatePoints = (points) => {
    setExtrapoints(points);
    dataFile[2].value = points;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={m ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchM}
          value={m}
        />
        <Text style={styles.txt}>Militeret/siviltjeneste</Text>
      </View>
      <View style={styles.row}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={f ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchF}
          value={f}
        />
        <Text style={styles.txt}>Folkehoyskole</Text>
      </View>
      <View style={styles.row}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={tre ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchTre}
          value={tre}
        />
        <Text style={styles.txt}>30 studiopoeng</Text>
      </View>
      <View style={styles.row}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={seks ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchSeks}
          value={seks}
        />
        <Text style={styles.txt}>60 studiopoeng</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
// <View style={{backgroundColor:"#000000aa", flex=1}}>
//<View style={{backgroundColor:"#ffffff", margin:50,paddin:40}}>
