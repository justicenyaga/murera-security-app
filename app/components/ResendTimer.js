import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";
import TextLink from "./TextLink";

const ResendTimer = ({ timeLeft, onPress }) => {
  return (
    <>
      <TextLink
        onPress={onPress}
        text="Didn't receive the email?"
        linkText="Resend"
        style={styles.textLink}
        disabled={timeLeft > 0}
      />

      {timeLeft > 0 && (
        <Text style={styles.text}>
          Resend in <Text style={styles.timeLeft}>{timeLeft}</Text> second
          {timeLeft !== 1 && "s"}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#777",
    alignSelf: "center",
  },
  textLink: {
    color: "#777",
    marginBottom: 5,
  },
  timeLeft: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

ResendTimer.propTypes = {
  timeLeft: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

export default ResendTimer;
