import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ResendTimer from "../components/ResendTimer";
import Text from "../components/Text";

import routes from "../navigation/routes";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const resendTimerDuration = 30; // seconds

const ActivationScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const resendVerificationApi = useApi(usersApi.resendVerification);
  const refreshAuthTokenApi = useApi(usersApi.refreshAuthToken);
  const { user, logIn } = useAuth();

  const [timeLeft, setTimeLeft] = useState();

  let resendTimerInterval;

  useEffect(() => {
    !user && navigation.navigate(routes.WELCOME);
    user.isActive && navigation.navigate(routes.HOME);
  }, [user]);

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) setTimeLeft(Math.round(difference / 1000));
    else {
      setTimeLeft(0);
      clearInterval(resendTimerInterval);
    }
  };

  const triggerTimer = () => {
    const finalTime = +new Date() + resendTimerDuration * 1000;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  const resendVerification = async () => {
    triggerTimer();
    const { ok, data } = await resendVerificationApi.request(user.email);
    if (!ok) return toast.show(data, { type: "error" });

    toast.show("Verification email sent", { type: "success" });
  };

  const refreshAuthToken = async () => {
    const { ok, data } = await refreshAuthTokenApi.request();
    if (!ok) return toast.show(data, { type: "error" });
    logIn(data);

    if (!user.isActive) {
      toast.show("Email not verified", { type: "error" });
    }
  };

  return (
    <>
      <ActivityIndicator
        visible={refreshAuthTokenApi.loading || resendVerificationApi.loading}
      />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon
            name="email-newsletter"
            size={150}
            backgroundColor="#f9f9f9"
            iconColor="#f8bbd0"
          />
        </View>

        <Text style={styles.heading}>Account Verification</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.text}>
            Please verify your email using the link sent to{" "}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Button title="Proceed" onPress={refreshAuthToken} />

        <ResendTimer timeLeft={timeLeft} onPress={resendVerification} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  detailsContainer: {
    marginVertical: 20,
  },
  email: {
    fontWeight: "bold",
    textAlign: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  iconContainer: {
    marginVertical: 70,
  },
  text: {
    textAlign: "center",
    color: "#777",
  },
});

export default ActivationScreen;
