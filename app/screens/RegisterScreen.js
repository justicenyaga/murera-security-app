import React from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import YupPassword from "yup-password";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

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

const RegisterScreen = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Screen style={styles.container} disablePaddingTop>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

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
          secureTextEntry
          textContentType="password"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-check"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />

        <SubmitButton title="Register" />
      </Form>
    </Screen>
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

export default RegisterScreen;
