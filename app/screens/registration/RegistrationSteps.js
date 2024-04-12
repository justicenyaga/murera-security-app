import React from "react";

import ContactInfo from "./ContactInfo";
import PasswordSetup from "./PasswordSetup";
import PersonalDetails from "./PersonalDetails";
import { Steps } from "../../components/stepper";

const RegistrationSteps = () => {
  return (
    <Steps numOfSteps={3}>
      <PersonalDetails />
      <ContactInfo />
      <PasswordSetup />
    </Steps>
  );
};

export default RegistrationSteps;
