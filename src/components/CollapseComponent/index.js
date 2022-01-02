import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const CollapseComponent = (props) => {
  // fix prop --> render( <Text> .... <>)
  const { title: _title, text: _text, height: _height } = props;
  const editHeight = useRef(new Animated.Value(0)).current;
  const [isCollapsed, setIsCollapsed] = useState(true);
  function edit_height() {
    Animated.timing(editHeight, {
      toValue: isCollapsed ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }
  const collapseHandler = () => {
    edit_height();
    setIsCollapsed(!isCollapsed);
    console.log(_text.length);
  };

  return (
    <TouchableOpacity
      style={GlobalStyles.whiteContainer}
      onPress={collapseHandler}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "90%" }}>
          <Text style={[GlobalStyles.listText, { fontWeight: "bold" }]}>
            {_title}
          </Text>
        </View>
        <View style={GlobalStyles.listEndContainer}>
          <Icon name={isCollapsed ? "angle-down" : "angle-up"} size={30} />
        </View>
      </View>

      <Animated.View
        style={{
          height: editHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, _height ? _height : 40], // len(text) noe?
          }),
        }}
      >
        {isCollapsed ? null : (
          <View>
            <View style={GlobalStyles.ItemSeparatorComponent} />
            <Text style={styles.text}>{_text}</Text>
            {/* <Text>{_render}</Text> */}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    marginTop: 10,
    //backgroundColor: "red",
  },
});

export default CollapseComponent;
