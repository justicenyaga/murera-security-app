import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import CaseDetailsScreen from "../screens/CaseDetailsScreen";

import routes from "./routes";
import CasesScreen from "../screens/CasesScreen";

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
  </Stack.Navigator>
);

export default AccountNavigator;
