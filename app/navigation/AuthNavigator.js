import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";

import ActivationScreen from "../screens/ActivationScreen.js";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen.js";
import LoginScreen from "../screens/LoginScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen.js";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen.js";
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
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen
      name={routes.OTP_VERIFICATION}
      component={OtpVerificationScreen}
      options={{ title: "" }}
    />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen
      name={routes.RESET_PASSWORD}
      component={ResetPasswordScreen}
      options={{ title: "" }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
