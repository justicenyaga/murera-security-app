import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/Text";

const ChangeEmailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Change Email Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default ChangeEmailScreen;
