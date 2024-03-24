import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import YupPassword from "yup-password";
import _ from "lodash";
import PropTypes from "prop-types";
import { useToast } from "react-native-toast-notifications";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import TextLink from "../components/TextLink";
import { Form, FormField, SubmitButton } from "../components/forms";

import authApi from "../api/auth";
import routes from "../navigation/routes";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .label("First Name"),
  lastName: Yup.string().required("Last name is required").label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match",
  ),
});

const RegisterScreen = ({ navigation }) => {
  const toast = useToast();
  const auth = useAuth();
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const handleSubmit = async (userInfo) => {
    const data = _.pick(userInfo, [
      "firstName",
      "lastName",
      "email",
      "password",
    ]);
    const result = await registerApi.request(data);
    if (!result.ok) {
      if (result.status === 500) {
        toast.show("An unexpected error occurred", { type: "error" });
      } else toast.show(result.data, { type: "error" });
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password,
    );

    auth.logIn(authToken);

    navigation.navigate(routes.ACTIVATION);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container} disablePaddingTop>
        <Form
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <Image style={styles.logo} source={require("../assets/logo.png")} />

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
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
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

          <SubmitButton title="Register" />

          <TextLink
            onPress={() => navigation.navigate(routes.LOGIN)}
            text="Already have an account?"
            linkText="Login"
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
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterScreen;
