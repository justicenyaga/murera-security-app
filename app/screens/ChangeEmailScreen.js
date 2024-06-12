import React from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";

import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("New Email"),
  password: Yup.string().required().label("Current Password"),
});

const ChangeEmailScreen = () => {
  const toast = useToast();
  const { refreshUser } = useAuth();
  const changeEmailApi = useApi(usersApi.changeEmail);

  const handleSubmit = async (emailPassword, { resetForm }) => {
    const { data, ok } = await changeEmailApi.request(emailPassword);
    if (!ok) return toast.show(data, { type: "error" });

    toast.show("Email changed successfully", { type: "success" });
    resetForm();
    refreshUser();
  };

  return (
    <>
      <ActivityIndicator visible={changeEmailApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Text style={styles.header}>Change Email</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="New Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Current Password"
            isPasswordField
            textContentType="password"
          />
          <SubmitButton title="Change Email" />
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

export default ChangeEmailScreen;
