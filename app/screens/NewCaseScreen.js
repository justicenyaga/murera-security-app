import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";

const NewCaseScreen = () => {
  return (
    <View style={styles.container}>
      <Text>New Case</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    flex: 1,
    justifyContent: "center",
  },
});

export default NewCaseScreen;
