import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import "yup-phone-lite";

import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import { Step } from "../../components/stepper";
import { FormField, FormPhoneInput } from "../../components/forms";

import cache from "../../utils/cache";
import cacheKeys from "../../utils/cacheKeys";
import defaultStyles from "../../config/styles";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import { StepsContext } from "../../components/stepper/Steps";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .phone("KE", "Phone Number must be a valid phone number")
    .required()
    .label("Phone Number"),
  email: Yup.string().required().email().label("Email"),
});

const ContactInfo = () => {
  const toast = useToast();
  const { goNext } = useContext(StepsContext);
  const checkEmailApi = useApi(usersApi.checkEmail);

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

  const submitHandler = async (contactInfo) => {
    const { ok, data } = await checkEmailApi.request(contactInfo.email);
    if (!ok) return toast.show(data, { type: "error" });

    cache.store(cacheKeys.newUser, { ...userData, ...contactInfo });
    goNext();
  };

  if (loading) return <ActivityIndicator visible />;

  return (
    <Screen style={styles.container} disablePaddingTop>
      <Formik
        initialValues={{
          phoneCode: userData?.phoneCode || "254",
          phone: userData?.phone || "",
          email: userData?.email || "",
        }}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Step onNext={handleSubmit} loading={checkEmailApi.loading}>
            <ScrollView>
              <Image
                style={[defaultStyles.form.logo, styles.logo]}
                source={require("../../assets/logo.png")}
              />

              <Text style={[defaultStyles.form.heading, styles.heading]}>
                Contact
              </Text>

              <FormPhoneInput
                codeName="phoneCode"
                defaultCode="KE"
                name="phone"
                placeholder="Phone Number"
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
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
  logo: {
    marginTop: 20,
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ContactInfo;
