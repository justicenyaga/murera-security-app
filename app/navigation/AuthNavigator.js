import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";

import ActivationScreen from "../screens/ActivationScreen.js";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.WELCOME}
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen
      name={routes.ACTIVATION}
      component={ActivationScreen}
      options={{ title: "" }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
