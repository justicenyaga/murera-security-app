import React, { createContext, useState } from "react";
import { Platform } from "react-native";
import { ProgressSteps } from "react-native-progress-steps";
import PropTypes from "prop-types";

import colors from "../../config/colors";

export const StepsContext = createContext();

const Steps = ({ children, isComplete = false, numOfSteps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const goTo = (step) => {
    setActiveStep(step);
  };

  const goPrevious = () => {
    activeStep > 0 && setActiveStep(activeStep - 1);
  };

  const goNext = () => {
    activeStep < numOfSteps - 1 && setActiveStep(activeStep + 1);
  };

  return (
    <StepsContext.Provider value={{ goNext, goPrevious, goTo }}>
      <ProgressSteps
        activeLabelColor={colors.primary}
        activeStep={activeStep}
        activeStepIconBorderColor={colors.primary}
        activeStepNumColor={colors.white} // make number invisible
        completedCheckColor={colors.primary} // make icon invisible
        completedProgressBarColor={colors.primary}
        completedStepIconColor={colors.primary}
        disabledStepNumColor="#ebebe4" // make number invisible
        topOffset={5}
        marginBottom={0}
        isComplete={isComplete}
        labelFontFamily={Platform.OS === "android" ? "Roboto" : "Avenir"}
      >
        {children}
      </ProgressSteps>
    </StepsContext.Provider>
  );
};

Steps.propTypes = {
  children: PropTypes.node,
  isComplete: PropTypes.bool,
  numOfSteps: PropTypes.number.isRequired,
};

export default Steps;
