import React, { useCallback, useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import * as SplashScreen from "expo-splash-screen";

import authStorage from "./app/auth/storage";

import navigationTheme from "./app/navigation/navigationTheme";
import usersApi from "./app/api/users";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import ToastProvider from "./app/components/ToastProvider";

// Keep the splash screen visible while we fetch the resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const toast = useToast();

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const token = await authStorage.getToken();
    if (token) {
      const { ok, data } = await usersApi.getUser();
      if (ok) setUser(data);
      else toast.show(data, { type: "error" });
    }
    setIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ToastProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <NavigationContainer theme={navigationTheme}>
            {user?.isActive ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
