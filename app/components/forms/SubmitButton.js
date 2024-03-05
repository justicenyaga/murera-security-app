import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import Button from "../Button";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} />;
};

SubmitButton.propTypes = {
  title: PropTypes.string,
};

export default SubmitButton;
