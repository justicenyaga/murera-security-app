import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";

import colors from "../config/colors";
import useAuth from "../auth/useAuth";

const UserCard = () => {
  const { user } = useAuth();

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: user.image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {user.firstName} {user.lastName}
        </Text>

        <View style={styles.idRow}>
          <Text style={styles.idTitle}>ID number </Text>
          <Text style={styles.idValue} numberOfLines={1}>
            {user.nationalId}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    flexDirection: "row",
    overflow: "hidden",
    padding: 10,
    width: "100%",
    height: 100,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  idRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  idTitle: {
    backgroundColor: colors.green,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textTransform: "uppercase",
  },
  idValue: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textTransform: "uppercase",
  },
  image: {
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default UserCard;
