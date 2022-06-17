import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import Collapsible from "react-native-collapsible";

interface CollapsibleItemProps {
  title: string;
  children?: ReactNode;
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={() => setIsCollapsed((p) => !p)}>
      <View style={GlobalStyles.whiteContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: "90%" }}>
            <View>
              <Text style={[GlobalStyles.listText, { fontWeight: "bold" }]}>
                {props.title}
              </Text>
            </View>
          </View>
          <View style={GlobalStyles.listEndContainer}>
            <FontAwesome5
              name={isCollapsed ? "angle-down" : "angle-up"}
              size={30}
              color={GlobalStyles.blueColor.color}
            />
          </View>
        </View>
        <Collapsible collapsed={isCollapsed}>
          <View style={GlobalStyles.ItemSeparatorComponent} />
          <View>{props?.children}</View>
        </Collapsible>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

function mapStateToProps(state: any) {
  return {};
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleItem);
