import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Text from "../components/Text";
import Screen from "../components/Screen";
import colors from "../config/colors";
import statusStyle from "../utils/statusStyle";

const CaseDetailsScreen = ({ route }) => {
  const caseDetails = route.params;

  const date = new Date(caseDetails.createdAt).toLocaleDateString("en-GB");
  const time = new Date(caseDetails.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateTime = `${date}, ${time}`;

  let status = caseDetails.status;
  if (status === "InProgress") status = "In Progress";

  return (
    <View style={[styles.container, statusStyle(caseDetails.status)]}>
      <View style={styles.card}>
        <Text style={styles.title}>{caseDetails.title}</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{caseDetails.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{status}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Police Station:</Text>
          <Text style={styles.value}>{caseDetails.station.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Reported On:</Text>
          <Text style={styles.value}>{dateTime}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Case Reference:</Text>
          <Text style={styles.value}>{caseDetails._id}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowColor: colors.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    backgroundColor: colors.light,
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: colors.medium,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
});

CaseDetailsScreen.propTypes = {
  route: PropTypes.object,
};

export default CaseDetailsScreen;
