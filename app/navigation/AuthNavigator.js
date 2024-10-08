import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";

import ActivationScreen from "../screens/ActivationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import RegistrationSteps from "../screens/registration/RegistrationSteps";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.WELCOME}
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.ACTIVATION}
      component={ActivationScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name={routes.FORGOT_PASSWORD}
      component={ForgotPasswordScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name={routes.LOGIN}
      component={LoginScreen}
      options={{ title: "Sign In" }}
    />
    <Stack.Screen
      name={routes.OTP_VERIFICATION}
      component={OtpVerificationScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name={routes.REGISTER}
      component={RegistrationSteps}
      options={{ title: "Sign Up" }}
    />
    <Stack.Screen
      name={routes.RESET_PASSWORD}
      component={ResetPasswordScreen}
      options={{ title: "" }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
