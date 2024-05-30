import React from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import UserCard from "../components/UserCard";

const HomeScreen = () => {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <UserCard />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
  },
  container: {
    paddingTop: 20,
    width: "100%",
  },
});

export default HomeScreen;
