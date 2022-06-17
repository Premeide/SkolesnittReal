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

  return (
    <View
      style={[
        GlobalStyles.customBtnContainer,
        { flexDirection: "row", bottom: "1%" },
      ]}
    >
      <TouchableOpacity
        onPress={toggleModalHandler}
        style={[styles.btn, GlobalStyles.elevation]}
      >
        <Text style={styles.btnText}>Legg til</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#3EB489",
    padding: 10,
    borderRadius: 15,
    // marginHorizontal: 10,
    width: SCREEN_WIDTH * 0.4,
    // elevation: 30,
    // shadowColor: "black",
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
});

export default AddOrDeleteBtn;
