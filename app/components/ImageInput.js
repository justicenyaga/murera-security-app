import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottiView from "lottie-react-native";
import PropTypes from "prop-types";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

const ImageInput = ({
  disabledDelete,
  loading,
  imageUrl,
  onChangeImage,
  style,
}) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const handlePress = () => {
    if (!imageUrl || disabledDelete) selectImage();
    else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        {loading ? (
          <LottiView
            autoPlay
            loop
            source={require("../assets/animations/loader.json")}
            style={styles.loader}
          />
        ) : imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons
            name="camera"
            color={colors.medium}
            size={40}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
  },
  loader: {
    flex: 1,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

ImageInput.propTypes = {
  disabledDelete: PropTypes.bool,
  imageUrl: PropTypes.string,
  loading: PropTypes.bool,
  onChangeImage: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ImageInput;
