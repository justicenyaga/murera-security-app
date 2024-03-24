import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import routes from "./routes";
import useAuth from "../auth/useAuth";

import ActivationScreen from "../screens/ActivationScreen.js";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    !user.isActive && navigation.navigate(routes.ACTIVATION);
  });

  return (
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
};

export default AuthNavigator;
