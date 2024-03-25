import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useToast } from "react-native-toast-notifications";

import ActivityIndicator from "../components/ActivityIndicator";
import Link from "../components/Link";
import Screen from "../components/Screen";
import TextLink from "../components/TextLink";
import { Form, FormField, SubmitButton } from "../components/forms";

import authApi from "../api/auth";
import emailOrNationalIDTest from "../utils/emailOrNationalIDTest";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required("Email or National ID is required")
    .test(emailOrNationalIDTest),
  password: Yup.string().required().label("Password"),
});

const LoginScreen = ({ navigation }) => {
  const toast = useToast();
  const loginApi = useApi(authApi.login);
  const { user, logIn } = useAuth();

  const handleSubmit = async ({ identifier, password }) => {
    const { ok, status, headers, data } = await loginApi.request(
      identifier,
      password,
    );
    if (!ok) {
      if (status === 500) {
        toast.show("An unexpected error occurred.", { type: "error" });
      } else toast.show(data, { type: "error" });
      return;
    }

    const authToken = headers["x-auth-token"];
    logIn(authToken);

    if (!data.isActive) navigation.navigate(routes.ACTIVATION);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container} disablePaddingTop>
        <Form
          initialValues={{ identifier: user ? user.email : "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="identifier"
              placeholder="Email or National ID"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              isPasswordField
              textContentType="password"
            />

            <Link
              onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}
              text="Forgot password?"
              style={styles.forgotPassword}
            />
          </ScrollView>

          <SubmitButton title="Login" />

          <TextLink
            onPress={() => navigation.navigate(routes.REGISTER)}
            text="Dont have an account?"
            linkText="Register"
          />
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  forgotPassword: {
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginScreen;
