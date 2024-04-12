import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import YupPassword from "yup-password";
import * as Yup from "yup";
import _ from "lodash";

import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import { Step } from "../../components/stepper";
import { FormField } from "../../components/forms";

import authApi from "../../api/auth";
import cache from "../../utils/cache";
import cacheKeys from "../../utils/cacheKeys";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import usersApi from "../../api/users";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

const PasswordSetup = () => {
  const auth = useAuth();
  const toast = useToast();
  const navigation = useNavigation();
  const loginApi = useApi(authApi.login);
  const registerApi = useApi(usersApi.register);

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

  const submitHandler = async ({ password }) => {
    const userInfo = _.omit(userData, ["phoneCode"]);
    userInfo.phone = `+${userData.phoneCode}${userData.phone}`;
    userInfo.password = password;

    const { ok, data } = await registerApi.request(userInfo);
    if (ok) {
      cache.remove(cacheKeys.newUser);

      const { headers } = await loginApi.request(userInfo.email, password);
      auth.logIn(headers["x-auth-token"]);

      navigation.navigate(routes.ACTIVATION);
    } else toast.show(data, { type: "error" });
  };

  if (loading) return <ActivityIndicator visible />;

  return (
    <Screen style={styles.container} disablePaddingTop>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Step
            loading={registerApi.loading || loginApi.loading}
            nextBtnText="Register"
            onNext={handleSubmit}
          >
            <ScrollView>
              <Image
                style={[defaultStyles.form.logo, styles.logo]}
                source={require("../../assets/logo.png")}
              />

              <Text style={[defaultStyles.form.heading, styles.heading]}>
                Password Setup
              </Text>

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                isPasswordField
                textContentType="password"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock-check"
                name="confirmPassword"
                placeholder="Confirm Password"
                isPasswordField
                textContentType="password"
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

export default PasswordSetup;
