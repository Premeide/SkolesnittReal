import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const DiscoverScreen = ({ navigation }) => {
  const karakterGrenser = require("../../assets/data/karaktergrense.json");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchContainer}>
        <Icon name="search" size={20} style={{ marginLeft: 10 }} />
        <Text style={styles.searchText}>Søk</Text>
      </TouchableOpacity>
      <FlatList
        data={karakterGrenser}
        keyExtractor={(item) => item.studiekode.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EducationDetails", {
                postStudiekode: item.studiekode,
              })
            }
            style={styles.listContainer}
          >
            <Text style={styles.listtxt} numberOfLines={1}>
              {item.studienavn}
            </Text>
            <Icon name="angle-right" size={20} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DiscoverScreen;
