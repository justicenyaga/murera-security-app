import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import colors from "../config/colors";

const Button = ({
  backgroundColor = colors.primary,
  disabled = false,
  icon,
  iconStyle,
  onPress,
  style,
  textStyle,
  title,
}) => {
  const bgColor = disabled ? colors.medium : backgroundColor;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]}
      disabled={disabled}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} style={[styles.icon, iconStyle]} />
      )}

      <Text style={[styles.text, textStyle, { marginLeft: icon ? 10 : 0 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    padding: 15,
    width: "100%",
  },
  icon: {
    color: colors.white,
    fontSize: 20,
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
  icon: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Button;
