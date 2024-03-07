import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import colors from "../config/colors";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.white,
    height: "100%",
    opacity: 0.8,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

ActivityIndicator.propTypes = {
  visible: PropTypes.bool,
};

export default ActivityIndicator;
