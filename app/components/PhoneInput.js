import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import RNPhoneNumberInput from "react-native-phone-number-input";
import PropTypes from "prop-types";

import defaultStyles from "../config/styles";

const PhoneInput = ({
  placeholder,
  setCode,
  setValue,
  value,
  width = "100%",
}) => {
  const phoneInput = useRef(null);

  const handleChangeCode = ({ callingCode }) => setCode(callingCode[0]);

  const handleChange = (text) => setValue(text);

  const getMaxLength = () => {
    const isValid = phoneInput.current?.isValidNumber(value);
    if (isValid) return value.length;

    return null;
  };

  return (
    <RNPhoneNumberInput
      autoFocus
      codeTextStyle={defaultStyles.text}
      containerStyle={[styles.container, { width }]}
      defaultCode="KE"
      defaultValue={value}
      layout="first"
      onChangeCountry={handleChangeCode}
      onChangeText={handleChange}
      ref={phoneInput}
      textContainerStyle={styles.textContainer}
      textInputProps={{
        maxLength: getMaxLength(),
        placeholder,
        placeholderTextColor: defaultStyles.colors.medium,
      }}
      textInputStyle={defaultStyles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    marginVertical: 10,
  },
  textContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
  },
});

PhoneInput.propTypes = {
  placeholder: PropTypes.string,
  setCode: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.string,
};

export default PhoneInput;
