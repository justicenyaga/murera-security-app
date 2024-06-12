import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";

import colors from "../config/colors";

const CaseCard = ({ caseDetails, onPress }) => {
  const date = new Date(caseDetails.createdAt).toLocaleDateString("en-GB");
  const time = new Date(caseDetails.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateTime = `${date} ${time}`;

  const statusStyles = { backgroundColor: "#9e9e9e", color: colors.white };
  switch (caseDetails.status) {
    case "Pending":
      statusStyles.backgroundColor = "#ffeb3b";
      statusStyles.color = colors.medium;
      break;
    case "InProgress":
      statusStyles.backgroundColor = "#4caf50";
      break;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {caseDetails.title}
          </Text>
          <Text style={styles.caseId} numberOfLines={1}>
            {caseDetails._id}
          </Text>
        </View>
        <Text style={styles.station} numberOfLines={1}>
          {caseDetails.station.name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.dateTime}>{dateTime}</Text>
          <Text style={[styles.status, statusStyles]}>
            {caseDetails.status}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  caseId: {
    color: colors.medium,
    fontSize: 10,
    textAlign: "right",
    width: "39%",
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
    shadowColor: colors.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dateTime: {
    fontSize: 14,
  },
  station: {
    marginVertical: 3,
  },
  status: {
    borderRadius: 15,
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  title: {
    fontWeight: "bold",
    width: "60%",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

CaseCard.propTypes = {
  caseDetails: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CaseCard;
