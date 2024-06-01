import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import { Step } from "../../components/stepper";
import { FormImageInput } from "../../components/forms";

import cache from "../../utils/cache";
import cacheKeys from "../../utils/cacheKeys";
import defaultStyles from "../../config/styles";
import { StepsContext } from "../../components/stepper/Steps";

const validationSchema = Yup.object().shape({
  imageUrl: Yup.string().required().label("Profile picture"),
});

const ProfilePicture = () => {
  const { goNext } = useContext(StepsContext);

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const getCachedUserData = async () => {
    const cachedData = await cache.get(cacheKeys.newUser);
    setUserData(cachedData);
    setLoading(false);
  };

  useEffect(() => {
    getCachedUserData();
  }, [userData?.firstName]);

  const submitHandler = async ({ imageUrl }) => {
    cache.store(cacheKeys.newUser, { ...userData, imageUrl });
    goNext();
  };

  if (loading) return <ActivityIndicator visible />;

  return (
    <Screen style={styles.container} disablePaddingTop>
      <Formik
        initialValues={{ imageUrl: userData?.imageUrl || "" }}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Step onNext={handleSubmit}>
            <ScrollView>
              <Image
                style={[defaultStyles.form.logo, styles.logo]}
                source={require("../../assets/logo.png")}
              />

              <Text style={[defaultStyles.form.heading, styles.heading]}>
                Profile Picture
              </Text>

              <View style={styles.imageInputContainer}>
                <FormImageInput name="imageUrl" style={styles.imageInput} />
              </View>
            </ScrollView>
          </Step>
        )}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  heading: {
    marginBottom: 20,
  },
  imageInput: {
    width: 240,
    height: 240,
  },
  imageInputContainer: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    marginTop: 20,
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProfilePicture;
