import React from "react";
import { View, Text, Switch } from "react-native";
import { localData } from "../../assets/data/GlobalData";
import styles from "./styles";

const ExtraPoints = (props) => {
  const [extrapoints, setExtrapoints] = React.useState(0);

  const [m, setM] = React.useState(localData.extraPoints.m); // switch
  const [f, setF] = React.useState(localData.extraPoints.f); // switch
  const [tre, setTre] = React.useState(localData.extraPoints.tre); // switch
  const [seks, setSeks] = React.useState(localData.extraPoints.seks); // switch
  const toggleSwitchM = () => {
    setM((previousState) => !previousState);
    localData.extraPoints.m = !m;

    !m || f || seks ? updatePoints(2) : tre ? updatePoints(1) : updatePoints(0);
  };
  const toggleSwitchF = () => {
    setF((previousState) => !previousState);

    localData.extraPoints.f = !f;
    m || !f || seks ? updatePoints(2) : tre ? updatePoints(1) : updatePoints(0);
  };
  const toggleSwitchTre = () => {
    setTre((previousState) => !previousState);
    localData.extraPoints.tre = !tre;

    seks ? setSeks((previousState) => !previousState) : null;
    m || f || seks ? updatePoints(2) : !tre ? updatePoints(1) : updatePoints(0);
  };
  const toggleSwitchSeks = () => {
    setSeks((previousState) => !previousState);
    localData.extraPoints.seks = !seks;

    tre ? setTre((previousState) => !previousState) : null;
    m || f || !seks ? updatePoints(2) : tre ? updatePoints(1) : updatePoints(0);
  };
  const updatePoints = (points) => {
    setExtrapoints(points);
    localData.extraPoints.value = points;
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

export default ExtraPoints;
