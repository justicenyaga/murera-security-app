import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import CaseDetailsScreen from "../screens/CaseDetailsScreen";

import routes from "./routes";
import CasesScreen from "../screens/CasesScreen";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangePhoneScreen from "../screens/ChangePhoneScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.CASES}
      component={CasesScreen}
      options={{ title: "Reported Cases" }}
    />
    <Stack.Screen
      name={routes.CASE_DETAILS}
      component={CaseDetailsScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name={routes.CHANGE_EMAIL}
      component={ChangeEmailScreen}
      options={{ title: "Change Email" }}
    />
    <Stack.Screen
      name={routes.CHANGE_PASSWORD}
      component={ChangePasswordScreen}
      options={{ title: "Change Password" }}
    />
    <Stack.Screen
      name={routes.CHANGE_PHONE}
      component={ChangePhoneScreen}
      options={{ title: "Change Phone Number" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
