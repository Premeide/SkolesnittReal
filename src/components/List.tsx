import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

interface ListProps {
  data: any[] | undefined;
  keyExtractor: (o: any) => void;
  ItemSeparatorComponent: () => void;
  renderItem: (o: any) => any;
}

const List: React.FC<ListProps> = (props) => {
  return (
    <View>
      {props?.data
        ? props.data.map((item, index) => (
            <View key={item.name}>
              {props.renderItem({ item, index })}
              {index >=
              (props?.data?.length ? props.data.length : 0) - 1 ? null : (
                <View style={GlobalStyles.ItemSeparatorComponent}></View>
              )}
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {
    // updateSnitt: () => dispatch({ type: "UPDATE_SNITT", payload: null }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
