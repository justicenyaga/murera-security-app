import React from "react";
import { View, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ResendTimer from "../components/ResendTimer";
import Text from "../components/Text";

import authApi from "../api/auth";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import useTimer from "../hooks/useTimer";

const ActivationScreen = () => {
  const toast = useToast();
  const resendVerificationApi = useApi(usersApi.resendVerification);
  const refreshAuthTokenApi = useApi(authApi.refreshAuthToken);
  const { user, logIn } = useAuth();
  const { timeLeft, triggerTimer } = useTimer();

  const resendVerification = async () => {
    triggerTimer();
    const { ok, data } = await resendVerificationApi.request(user.email);
    if (!ok) return toast.show(data, { type: "error" });

    toast.show("Verification email sent", { type: "success" });
  };

  const refreshAuthToken = async () => {
    const { ok, data, headers } = await refreshAuthTokenApi.request();
    if (!ok) return toast.show(data, { type: "error" });

    const authToken = headers["x-auth-token"];

    if (data.isActive) await logIn(authToken);
    else toast.show("Email not verified", { type: "error" });
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
          <Text style={styles.email}>{user?.email}</Text>
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
