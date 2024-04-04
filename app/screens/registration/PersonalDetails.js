import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";

import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import { Step } from "../../components/stepper";
import { FormDatePicker, FormField } from "../../components/forms";

import cache from "../../utils/cache";
import cacheKeys from "../../utils/cacheKeys";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import { StepsContext } from "../../components/stepper/Steps";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .label("First Name"),
  lastName: Yup.string().required("Last Name is required").label("Last Name"),
  nationalId: Yup.number()
    .required()
    .min(100000, "National ID must be a valid ID number")
    .max(50000000, "National ID must be a valid ID number")
    .label("National ID"),
  dob: Yup.date().required().label("Date of Birth"),
});

const PersonalDetails = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { goNext } = useContext(StepsContext);
  const checkNIdApi = useApi(usersApi.checkNationalId);

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

  const submitHandler = async (userInfo) => {
    const { ok, data } = await checkNIdApi.request(userInfo.nationalId);
    if (!ok) return toast.show(data, { type: "error" });

    cache.store(cacheKeys.newUser, { ...userData, ...userInfo });
    goNext();
  };

  if (loading) return <ActivityIndicator visible />;

  return (
    <Screen style={styles.container} disablePaddingTop>
      <Formik
        initialValues={{
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          nationalId: userData?.nationalId || "",
          dob: userData?.dob || null,
        }}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Step
            onPrevious={() => navigation.dispatch(CommonActions.goBack())}
            onNext={handleSubmit}
            loading={checkNIdApi.loading}
          >
            <ScrollView>
              <Image
                style={[defaultStyles.form.logo, styles.logo]}
                source={require("../../assets/logo.png")}
              />

              <Text style={[defaultStyles.form.heading, styles.heading]}>
                Personal Details
              </Text>

              <View style={styles.name}>
                <FormField
                  autoCorrect={false}
                  icon="account"
                  name="firstName"
                  placeholder="First Name"
                  width="49%"
                />
                <FormField
                  autoCorrect={false}
                  icon="account"
                  name="lastName"
                  placeholder="Last Name"
                  width="49%"
                />
              </View>
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="card-account-details"
                keyboardType="numeric"
                maxLength={8}
                name="nationalId"
                placeholder="National ID Number"
              />
              <FormDatePicker
                icon="calendar-month"
                name="dob"
                placeholder="Date of Birth"
                maximumDate={new Date(2006, 0, 1)}
              />

              <TextLink
                onPress={() => navigation.navigate(routes.LOGIN)}
                text="Already have an account?"
                linkText="Sign In"
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

export default PersonalDetails;
