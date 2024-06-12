import React from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import "yup-phone-lite";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import {
  Form,
  FormField,
  FormPhoneInput,
  SubmitButton,
} from "../components/forms";

import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .phone("KE", "Phone Number must be a valid phone number")
    .required()
    .label("Phone Number"),
  password: Yup.string().required().label("Current Password"),
});

const ChangePhoneScreen = () => {
  const toast = useToast();
  const { refreshUser } = useAuth();
  const changePhoneApi = useApi(usersApi.changePhone);

  const handleSubmit = async (formData, { resetForm }) => {
    const phone = `+${formData.phoneCode}${formData.phone}`;
    const password = formData.password;

    const { data, ok } = await changePhoneApi.request({ phone, password });
    if (!ok) return toast.show(data, { type: "error" });

    toast.show("Phone number changed successfully", { type: "success" });
    resetForm();
    refreshUser();
  };

  return (
    <>
      <ActivityIndicator visible={changePhoneApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ phone: "", phoneCode: "254", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Text style={styles.header}>Change Phone Number</Text>
          <FormPhoneInput
            codeName="phoneCode"
            defaultCode="KE"
            name="phone"
            placeholder="New Phone Number"
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
          <SubmitButton title="Change Phone" />
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

export default ChangePhoneScreen;
