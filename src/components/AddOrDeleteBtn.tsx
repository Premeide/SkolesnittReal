import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import GlobalStyles from "../assets/styles/GlobalStyles";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface AddOrDeleteBtnProps {
  toggleIsEditing: () => void;
  toggleModal: () => void;
  isEditing: boolean;
}

const AddOrDeleteBtn: React.FC<AddOrDeleteBtnProps> = ({
  toggleIsEditing,
  toggleModal,
  isEditing,
}) => {
  const toggleModalHandler = () => {
    runOnJS(toggleModal)();
  };
  const toggleIsEditingHandler = () => {
    runOnJS(toggleIsEditing)();
  };
  return (
    <View
      style={[
        GlobalStyles.customBtnContainer,
        { flexDirection: "row", bottom: "1%" },
      ]}
    >
      <TouchableOpacity
        onPress={toggleModalHandler}
        style={[styles.btn, { backgroundColor: "#3EB489" }]}
      >
        <Text style={styles.btnText}>Legg til</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleIsEditingHandler}
        style={[styles.btn, { backgroundColor: "#FF2400" }]}
      >
        <Text style={styles.btnText}>{isEditing ? "Ferdig" : "Fjern"}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    width: SCREEN_WIDTH * 0.4,
    elevation: 8,
    shadowColor: "#52006A",
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
});

export default AddOrDeleteBtn;
