import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import TextInput from "../TextInput";

const FormField = ({ name, width, isPasswordField, ...rest }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View style={{ width }}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        isPasswordField={isPasswordField}
        {...rest}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPasswordField: PropTypes.bool,
};

export default FormField;
