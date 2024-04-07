import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import ResendTimer from "../components/ResendTimer";
import Screen from "../components/Screen";
import Text from "../components/Text";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import passwordResetApi from "../api/passwordReset";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import useTimer from "../hooks/useTimer";

const OtpVerificationScreen = () => {
  const {
    params: { email },
  } = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const verifyOtpApi = useApi(passwordResetApi.verifyOtp);
  const resendOtpApi = useApi(passwordResetApi.requestReset);
  const { timeLeft, triggerTimer } = useTimer();

  const [otp, setOtp] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    otp.length < 6 ? setButtonDisabled(true) : setButtonDisabled(false);
  }, [otp]);

  const handleSubmit = async () => {
    const { ok, data } = await verifyOtpApi.request(otp);
    if (ok) {
      navigation.navigate(routes.RESET_PASSWORD, { email });
    } else toast.show(data, { type: "error" });
  };

  const resendOtp = async () => {
    triggerTimer();

    const { ok, data } = await resendOtpApi.request(email);
    if (ok) return toast.show("OTP sent", { type: "success" });

    toast.show(data, { type: "error" });
  };

  return (
    <>
      <ActivityIndicator
        visible={verifyOtpApi.loading || resendOtpApi.loading}
      />
      <Screen style={styles.screen}>
        <ScrollView>
          <Image
            style={defaultStyles.form.logo}
            source={require("../assets/logo.png")}
          />

          <Text style={defaultStyles.form.heading}>Verification</Text>
          <Text style={[defaultStyles.form.desc, styles.desc]}>
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

        <View style={styles.timerContainer}>
          <ResendTimer timeLeft={timeLeft} onPress={resendOtp} />
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  desc: {
    marginBottom: 40,
  },
  screen: {
    padding: 10,
  },
  timerContainer: {
    marginBottom: 10,
  },
});

export default OtpVerificationScreen;
