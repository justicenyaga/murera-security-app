import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import ErrorMessage from "./ErrorMessage";
import ImageInput from "../ImageInput";

const FormImageInput = ({ name, style }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <ImageInput
        imageUrl={values[name]}
        onChangeImage={(uri) => setFieldValue(name, uri)}
        style={style}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

FormImageInput.propTypes = {
  name: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormImageInput;
