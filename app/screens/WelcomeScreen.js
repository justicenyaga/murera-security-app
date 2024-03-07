import React from "react";
import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.tagline}>Report - Respond - Secure</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => console.log("Login")} />
        <Button
          title="Register"
          color="secondary"
          onPress={() => console.log("Register")}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 80,
  },
  tagline: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 20,
  },
});

export default WelcomeScreen;
