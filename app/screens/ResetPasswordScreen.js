import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import YupPassword from "yup-password";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";

import authApi from "../api/auth";
import defaultStyles from "../config/styles";
import passwordResetApi from "../api/passwordReset";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("New Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

const ResetPasswordScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { logIn } = useAuth();
  const loginApi = useApi(authApi.login);
  const resetPasswordApi = useApi(passwordResetApi.resetPassword);

  const handleSubmit = async ({ password }) => {
    const email = params.email;
    const { ok, data, status } = await resetPasswordApi.request(
      email,
      password,
    );

    if (!ok) return toast.show(data, { type: "error" });

    toast.show("Password reset successfully", { type: "success" });

    const { headers } = await loginApi.request(email, password);
    const authToken = headers["x-auth-token"];
    await logIn(authToken);

    status === 201 && navigation.navigate(routes.ACTIVATION);
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
            <Image
              style={defaultStyles.form.logo}
              source={require("../assets/logo.png")}
            />

            <Text style={defaultStyles.form.heading}>Reset Password</Text>
            <Text style={defaultStyles.form.desc}>
              Create a new secure password
            </Text>

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

          <SubmitButton title="Reset Password" icon="lock-reset" />
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
});

export default ResetPasswordScreen;
