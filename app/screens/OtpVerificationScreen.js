import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Text from "../components/Text";

import colors from "../config/colors";
import routes from "../navigation/routes";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";

const OtpVerificationScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const verifyPasswordResetOtpApi = useApi(usersApi.verifyPasswordResetOtp);

  const [otp, setOtp] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    otp.length < 6 ? setButtonDisabled(true) : setButtonDisabled(false);
  }, [otp]);

  const handleSubmit = async () => {
    const { ok, data } = await verifyPasswordResetOtpApi.request(otp);
    if (ok) {
      navigation.navigate(routes.RESET_PASSWORD, { email: data.email });
    } else toast.show(data, { type: "error" });
  };

  return (
    <>
      <ActivityIndicator visible={verifyPasswordResetOtpApi.loading} />
      <Screen style={styles.screen}>
        <ScrollView>
          <Image style={styles.logo} source={require("../assets/logo.png")} />

          <Text style={styles.header}>Verification</Text>
          <Text style={styles.info}>
            We have sent an OTP to your email address. Please enter it below.
          </Text>

          <OtpInput
            numberOfInputs={6}
            focusColor={colors.primary}
            onTextChange={setOtp}
          />
        </ScrollView>

        <Button
          title="Verify"
          disabled={buttonDisabled}
          onPress={handleSubmit}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 7,
    textAlign: "center",
  },
  info: {
    color: "#777",
    textAlign: "center",
    marginBottom: 40,
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginBottom: 20,
    marginTop: 50,
    width: 80,
  },
});

export default OtpVerificationScreen;
