import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import ErrorMessage from "./ErrorMessage";
import PhoneInput from "../PhoneInput";

const FormPhoneInput = ({
  codeName,
  defaultCode,
  name,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <PhoneInput
        defaultCode={defaultCode}
        placeholder={placeholder}
        width={width}
        setCode={(text) => setFieldValue(codeName, text)}
        setValue={(text) => setFieldValue(name, text)}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

FormPhoneInput.propTypes = {
  codeName: PropTypes.string,
  defaultCode: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormPhoneInput;
