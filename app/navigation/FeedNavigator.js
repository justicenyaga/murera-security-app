import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CaseDetailsScreen from "../screens/CaseDetailsScreen";

import routes from "./routes";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.HOME}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.CASE_DETAILS}
      component={CaseDetailsScreen}
      options={{ title: "" }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
