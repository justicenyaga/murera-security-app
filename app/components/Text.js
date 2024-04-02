import React from "react";
import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

import defaultStyles from "../config/styles";

const Text = ({ children, style, ...rest }) => {
  return (
    <RNText style={[defaultStyles.text, style]} {...rest}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Text;
