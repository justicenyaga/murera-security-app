import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import colors from "../config/colors";

const Button = ({
  title,
  onPress,
  backgroundColor = colors.primary,
  disabled = false,
}) => {
  const bgColor = disabled ? colors.medium : backgroundColor;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    marginVertical: 10,
    padding: 15,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

Button.propTypes = {
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.string,
};

export default Button;
