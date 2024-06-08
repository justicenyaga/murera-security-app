import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";
import colors from "../config/colors";

const StationPickerItem = ({ item, selectedValue, onPress }) => {
  const selected = item.value === selectedValue;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selected ? colors.primary + 50 : colors.light },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label} numberOfLines={1}>
          {item.label}
        </Text>

        <Text style={styles.phoneTitle}>
          Phone:{" "}
          <Text style={styles.phone} numberOfLines={1}>
            {item.phone}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    justifyContent: "center",
    padding: 20,
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
  },
  phone: {
    color: colors.medium,
    fontSize: 16,
  },
  phoneTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

StationPickerItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
};

export default StationPickerItem;
