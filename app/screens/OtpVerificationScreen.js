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
import defaultStyles from "../config/styles";
import passwordResetApi from "../api/passwordReset";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";

const OtpVerificationScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const verifyOtpApi = useApi(passwordResetApi.verifyOtp);

  const [otp, setOtp] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    otp.length < 6 ? setButtonDisabled(true) : setButtonDisabled(false);
  }, [otp]);

  const handleSubmit = async () => {
    const { ok, data } = await verifyOtpApi.request(otp);
    if (ok) {
      navigation.navigate(routes.RESET_PASSWORD, { email: data.email });
    } else toast.show(data, { type: "error" });
  };

  return (
    <>
      <ActivityIndicator visible={verifyOtpApi.loading} />
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
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  desc: {
    marginBottom: 40,
  },
});

export default OtpVerificationScreen;
