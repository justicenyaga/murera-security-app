import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import defaultStyles from "../config/styles";

const AppTextInput = ({
  icon,
  width = "100%",
  isPasswordField = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, { flex: 1 }]}
        secureTextEntry={isPasswordField && !showPassword}
        {...rest}
      />
      {isPasswordField && (
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={25}
          color={defaultStyles.colors.medium}
          style={styles.passwordIcon}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  passwordIcon: {
    marginLeft: 10,
  },
});

AppTextInput.propTypes = {
  icon: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPasswordField: PropTypes.bool,
};

export default AppTextInput;
