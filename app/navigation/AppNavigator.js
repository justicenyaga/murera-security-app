import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NewCaseIcon from "./NewCaseIcon";
import routes from "./routes";

import AccountScreen from "../screens/AccountScreen";
import HomeScreen from "../screens/HomeScreen";
import NewCaseScreen from "../screens/NewCaseScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  // const responseReceivedListener = (response) => {
  //   navigation.navigate("Account", { screen: routes.ACCOUNT });
  // };

  // useNotifications(null, responseReceivedListener);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.NEW_CASE}
        component={NewCaseScreen}
        options={() => ({
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <NewCaseIcon focused={focused} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
