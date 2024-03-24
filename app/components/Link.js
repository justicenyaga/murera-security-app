import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";

const Link = ({ onPress, text, disabled = false, style }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <Text
        style={[
          {
            fontWeight: disabled ? "normal" : "bold",
            color: disabled ? "gray" : "dodgerblue",
          },
          style,
        ]}
      >
        {text}
      </Text>
    </TouchableWithoutFeedback>
  );
};

Link.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Link;
