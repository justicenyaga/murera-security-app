import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";
import colors from "../config/colors";

const PickerItem = ({ item, selectedValue, onPress }) => {
  const selected = item.value === selectedValue;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selected ? colors.primary + 50 : colors.light },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
  },
});

PickerItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PickerItem;
