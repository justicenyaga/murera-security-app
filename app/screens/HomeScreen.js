import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import UserCard from "../components/UserCard";

import colors from "../config/colors";
import routes from "../navigation/routes";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <UserCard />

        <Button
          title="Report Emergency"
          icon="alarm-light-outline"
          textStyle={styles.reportBtnText}
          style={styles.button}
          onPress={() => navigation.navigate(routes.NEW_CASE)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
  },
  container: {
    paddingTop: 20,
    width: "100%",
  },
  screen: {
    backgroundColor: colors.light,
    flex: 1,
    padding: 15,
  },
  reportBtnText: {
    textTransform: "none",
  },
});

export default HomeScreen;
