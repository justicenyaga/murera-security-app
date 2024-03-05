import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import PropTypes from "prop-types";

const Screen = ({ children, style, disablePaddingTop = false }) => {
  return (
    <SafeAreaView
      style={[
        styles.screen,
        style,
        { paddingTop: disablePaddingTop ? 0 : Constants.statusBarHeight },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

Screen.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  disablePaddingTop: PropTypes.bool,
};

export default Screen;
