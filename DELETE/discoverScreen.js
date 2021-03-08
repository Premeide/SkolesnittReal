import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const DiscoverScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.overskrift}>Se hva du kan studere</Text>
      <Text style={styles.søk}>
        <Icon name="search" size={20} color="grey" />
        {karakterGrenser[2].studienavn}
      </Text>
      <FlatList
        data={karakterGrenser}
        keyExtractor={(item) => item.studiekode.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Education Screen", {
                postStudiekode: item.studiekode,
              })
            }
          >
            <Text style={styles.listtxt}>- {item.studienavn}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 14,
  },
  overskrift: {
    fontSize: 30,
    fontWeight: "bold",
  },
  søk: {
    paddingLeft: 20,
    borderRadius: 50,
    backgroundColor: "white",
    fontSize: 20,
    color: "grey",
  },
  listtxt: {
    fontSize: 25,
    paddingVertical: 10,
    color: "black",
  },
});
export default DiscoverScreen;
