import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import DatePicker from "../DatePicker";
import ErrorMessage from "./ErrorMessage";

const FormDatePicker = ({ icon, name, placeholder, width, ...rest }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <DatePicker
        date={values[name]}
        icon={icon}
        placeholder={placeholder}
        setDate={(date) => setFieldValue(name, date)}
        width={width}
        {...rest}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

FormDatePicker.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormDatePicker;
