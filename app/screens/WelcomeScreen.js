import React from "react";
import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";
import PropTypes from "prop-types";

import Button from "../components/Button";
import Link from "../components/Link";

import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const WelcomeScreen = ({ navigation }) => {
  const { user } = useAuth();

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
        {user && !user.isActive && (
          <View style={{ marginVertical: 10, alignItems: "center" }}>
            <Link
              text="Activate Account"
              onPress={() => navigation.navigate(routes.ACTIVATION)}
            />
          </View>
        )}
        <Button
          title="Sign In"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Sign Up"
          backgroundColor={colors.secondary}
          onPress={() => navigation.navigate(routes.REGISTER)}
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

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default WelcomeScreen;
