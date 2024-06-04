import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useToast } from "react-native-toast-notifications";
import PropTypes from "prop-types";

import ImageInput from "./ImageInput";
import Text from "./Text";

import colors from "../config/colors";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const UserCard = ({ isEdit }) => {
  const toast = useToast();
  const { user, refreshUser } = useAuth();
  const changeImageApi = useApi(usersApi.changeImage);

  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = async (uri) => {
    const { data, ok } = await changeImageApi.request(uri);
    if (ok) {
      setImageUrl(uri);
      refreshUser();
    } else toast.show(data, { type: "error" });
  };

  useEffect(() => {
    setImageUrl(user.image);
  }, []);

  return (
    <View style={styles.card}>
      <View>
        {isEdit ? (
          <ImageInput
            disabledDelete
            imageUrl={imageUrl}
            loading={changeImageApi.loading}
            onChangeImage={handleImageChange}
            style={styles.imageInput}
          />
        ) : (
          <Image style={styles.image} source={{ uri: user.image }} />
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {user.firstName} {user.lastName}
        </Text>

        {isEdit ? (
          <>
            <Text>{user.email}</Text>
            <Text>{user.phone}</Text>
          </>
        ) : (
          <View style={styles.idRow}>
            <Text style={styles.idTitle}>ID number </Text>
            <Text style={styles.idValue} numberOfLines={1}>
              {user.nationalId}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.white,
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
    backgroundColor: colors.light,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textTransform: "uppercase",
  },
  image: {
    borderRadius: 15,
    width: 80,
    height: 80,
  },
  imageInput: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

UserCard.propTypes = {
  isEdit: PropTypes.bool,
};

export default UserCard;
