import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useNavigation } from "@react-navigation/native";

import CaseCard from "../components/CaseCard";

import colors from "../config/colors";
import routes from "../navigation/routes";
import useCases from "../hooks/useCases";

const CasesScreen = () => {
  const navigation = useNavigation();
  const { cases, getCases } = useCases();

  const [currentTab, setCurrentTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const data = currentTab === 0 ? cases.ongoing : cases.closed;

  useEffect(() => {
    getCases();
  }, []);

  const refreshCases = async () => {
    setRefreshing(true);
    await getCases();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={["Open", "Closed"]}
        selectedIndex={currentTab}
        onChange={(event) =>
          setCurrentTab(event.nativeEvent.selectedSegmentIndex)
        }
        style={{ marginBottom: 10, width: "100%" }}
        tintColor={colors.primary}
        backgroundColor={colors.white}
        fontStyle={{ color: colors.medium }}
        activeFontStyle={{ color: colors.white, fontWeight: "bold" }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        refreshing={refreshing}
        onRefresh={refreshCases}
        renderItem={({ item }) => (
          <CaseCard
            caseDetails={item}
            onPress={() => navigation.navigate(routes.CASE_DETAILS, item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});

export default CasesScreen;
