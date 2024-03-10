import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";
import PropTypes from "prop-types";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const LoginScreen = ({ navigation }) => {
  const auth = useAuth();
  const loginApi = useApi(authApi.login);

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await loginApi.request(email, password);
    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);

    auth.logIn(result.data);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container} disablePaddingTop>
        <Image style={styles.logo} source={require("../assets/logo.png")} />

        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
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
          <SubmitButton title="Login" />

          <View style={styles.registerContainer}>
            <Text>Dont have an account? </Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(routes.REGISTER)}
            >
              <Text style={styles.register}>Register</Text>
            </TouchableWithoutFeedback>
          </View>
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
  register: {
    color: "dodgerblue",
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginScreen;
