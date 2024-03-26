import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";

import authApi from "../api/auth";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("New Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match",
  ),
});

const ResetPasswordScreen = () => {
  const toast = useToast();
  const { params } = useRoute();
  const { logIn } = useAuth();
  const loginApi = useApi(authApi.login);
  const resetPasswordApi = useApi(usersApi.resetPassword);

  const handleSubmit = async ({ password }) => {
    const email = params.email;
    const { ok, data } = await resetPasswordApi.request(email, password);

    if (!ok) return toast.show(data, { type: "error" });

    const { headers } = await loginApi.request(email, password);
    const authToken = headers["x-auth-token"];
    logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator
        visible={resetPasswordApi.loading || loginApi.loading}
      />
      <Screen style={styles.screen}>
        <Form
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <Image style={styles.logo} source={require("../assets/logo.png")} />

            <Text style={styles.header}>Reset Password</Text>
            <Text style={styles.info}>Create a new secure password</Text>

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="New Password"
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

          <SubmitButton title="Reset Password" />
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 7,
    textAlign: "center",
  },
  info: {
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginBottom: 20,
    marginTop: 50,
    width: 80,
  },
});

export default ResetPasswordScreen;
