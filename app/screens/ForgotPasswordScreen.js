import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import TextLink from "../components/TextLink";
import { Form, FormField, SubmitButton } from "../components/forms";

import defaultStyles from "../config/styles";
import emailOrNationalIDTest from "../utils/emailOrNationalIDTest";
import routes from "../navigation/routes";
import passwordResetApi from "../api/passwordReset";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required("Email or National ID is required")
    .test(emailOrNationalIDTest),
});

const ForgotPasswordScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const requestResetApi = useApi(passwordResetApi.requestReset);

  const handleSubmit = async ({ identifier }) => {
    const { ok, data } = await requestResetApi.request(identifier);
    if (ok) navigation.navigate(routes.OTP_VERIFICATION, { email: data.email });
    else toast.show(data, { type: "error" });
  };

  return (
    <>
      <ActivityIndicator visible={requestResetApi.loading} />
      <Screen style={styles.screen}>
        <Form
          initialValues={{ identifier: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <Image
              style={defaultStyles.form.logo}
              source={require("../assets/logo.png")}
            />

            <Text style={defaultStyles.form.heading}>Forgot Password</Text>
            <Text style={defaultStyles.form.desc}>
              Let&apos;s help you reset your password
            </Text>

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="identifier"
              placeholder="Email or National ID"
            />
          </ScrollView>

          <SubmitButton title="Send OTP" icon="send" />

          <TextLink
            onPress={() => navigation.navigate(routes.LOGIN)}
            text="Remembered your password?"
            linkText="Sign In"
          />
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

export default ForgotPasswordScreen;
