import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Text from "../Text";

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

ErrorMessage.propTypes = {
  error: PropTypes.string,
  visible: PropTypes.bool,
};

export default ErrorMessage;
