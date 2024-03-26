import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import Button from "../Button";

const SubmitButton = ({ title, disabled }) => {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} disabled={disabled} />;
};

SubmitButton.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SubmitButton;
