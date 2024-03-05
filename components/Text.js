import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

import defaultStyles from "../config/styles";

const AppText = ({ children, style, ...rest }) => {
  return (
    <Text style={[defaultStyles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

AppText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppText;
