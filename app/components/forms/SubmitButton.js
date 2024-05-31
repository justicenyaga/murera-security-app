import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import Button from "../Button";

const SubmitButton = ({ title, icon, disabled }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      title={title}
      onPress={handleSubmit}
      disabled={disabled}
      icon={icon}
    />
  );
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default SubmitButton;
