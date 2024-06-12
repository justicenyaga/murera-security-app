import React from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import _ from "lodash";
import YupPassword from "yup-password";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";

import usersApi from "../api/users";
import useApi from "../hooks/useApi";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("New Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .label("Confirm New Password"),
  currentPassword: Yup.string().required().label("Current Password"),
});

const ChangePasswordScreen = () => {
  const toast = useToast();
  const changePasswordApi = useApi(usersApi.changePassword);

  const handleSubmit = async (formData, { resetForm }) => {
    const passwords = _.pick(formData, ["newPassword", "currentPassword"]);

    const { data, ok } = await changePasswordApi.request(passwords);
    if (!ok) return toast.show(data, { type: "error" });

    toast.show("Password changed successfully", { type: "success" });
    resetForm();
  };

  return (
    <>
      <ActivityIndicator visible={changePasswordApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{
            newPassword: "",
            confirmPassword: "",
            currentPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Text style={styles.header}>Change Password</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPassword"
            placeholder="New Password"
            isPasswordField
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-check"
            name="confirmPassword"
            placeholder="Confirm New Password"
            isPasswordField
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-outline"
            name="currentPassword"
            placeholder="Current Password"
            isPasswordField
            textContentType="password"
          />
          <SubmitButton title="Change Password" />
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
});

export default ChangePasswordScreen;
