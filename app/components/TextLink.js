import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Link from "./Link";
import Text from "./Text";

const TextLink = ({ onPress, text, linkText, disabled = false, style }) => {
  return (
    <Text style={[styles.text, style]}>
      {text} <Link onPress={onPress} text={linkText} disabled={disabled} />
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
  },
});

TextLink.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default TextLink;
