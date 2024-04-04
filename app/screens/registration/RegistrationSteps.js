import React from "react";
import { View, Text } from "react-native";
import * as Yup from "yup";
import YupPassword from "yup-password";

import PersonalDetails from "./PersonalDetails";
import { Step, Steps } from "../../components/stepper";

YupPassword(Yup);

const RegistrationSteps = () => {
  return (
    <Steps numOfSteps={4}>
      <PersonalDetails />
      <Step>
        <View style={{ alignItems: "center" }}>
          <Text>Step 2</Text>
        </View>
      </Step>
      <Step>
        <View style={{ alignItems: "center" }}>
          <Text>Step 3</Text>
        </View>
      </Step>
      <Step>
        <View style={{ alignItems: "center" }}>
          <Text>Step 4</Text>
        </View>
      </Step>
    </Steps>
  );
};

export default RegistrationSteps;
