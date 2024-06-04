import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import colors from "../config/colors";

const NewCaseIcon = ({ focused, color }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: focused ? colors.primary : color },
      ]}
    >
      <MaterialCommunityIcons
        name="alarm-light"
        size={30}
        color={colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 5,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
});

NewCaseIcon.propTypes = {
  color: PropTypes.string,
  focused: PropTypes.bool,
};

export default NewCaseIcon;
