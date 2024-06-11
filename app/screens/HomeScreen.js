import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import CaseCard from "../components/CaseCard";
import Screen from "../components/Screen";
import Text from "../components/Text";
import UserCard from "../components/UserCard";

import colors from "../config/colors";
import routes from "../navigation/routes";
import useCases from "../hooks/useCases";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { cases, getCases } = useCases();

  const [refreshingCases, setRefreshingCases] = useState(false);

  const refreshCases = async () => {
    setRefreshingCases(true);
    await getCases();
    setRefreshingCases(false);
  };

  useEffect(() => {
    getCases();
  }, [cases.all.length]);

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

        {cases.ongoing.length > 0 && (
          <>
            <Text style={styles.casesHeading}>Open Cases</Text>
            <FlatList
              data={cases.ongoing}
              keyExtractor={(item) => item._id.toString()}
              maxHeight={"63%"}
              onRefresh={refreshCases}
              refreshing={refreshingCases}
              renderItem={({ item }) => (
                <CaseCard
                  caseDetails={item}
                  onPress={() => navigation.navigate(routes.CASE_DETAILS, item)}
                />
              )}
            />
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
  },
  casesHeading: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
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
