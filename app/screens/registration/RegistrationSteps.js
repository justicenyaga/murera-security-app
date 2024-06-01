import React from "react";

import ContactInfo from "./ContactInfo";
import PasswordSetup from "./PasswordSetup";
import PersonalDetails from "./PersonalDetails";
import ProfilePicture from "./ProfilePicture";

import { Steps } from "../../components/stepper";

const RegistrationSteps = () => {
  return (
    <Steps numOfSteps={4}>
      <PersonalDetails />
      <ContactInfo />
      <ProfilePicture />
      <PasswordSetup />
    </Steps>
  );
};

export default RegistrationSteps;
