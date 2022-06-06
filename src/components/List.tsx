import React from "react";
import { StyleSheet, View } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { connect } from "react-redux";

interface ListProps {
  data: any[] | undefined;
  keyExtractor: (o: any) => string;
  ItemSeparatorComponent: () => void;
  renderItem: (o: any) => any;
}

const List: React.FC<ListProps> = (props) => {
  return (
    <View>
      {props?.data
        ? props.data.map((item, index) => (
            <View key={props.keyExtractor(item)}>
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
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
