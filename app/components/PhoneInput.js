import React from "react";
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
  const handleChangeCode = ({ callingCode }) => setCode(callingCode);

  return (
    <RNPhoneNumberInput
      containerStyle={[styles.container, { width }]}
      codeTextStyle={defaultStyles.text}
      textContainerStyle={styles.textContainer}
      defaultValue={value}
      defaultCode="KE"
      layout="first"
      textInputStyle={defaultStyles.text}
      textInputProps={{
        placeholder,
        maxLength: 9,
        placeholderTextColor: defaultStyles.colors.medium,
      }}
      onChangeCountry={handleChangeCode}
      onChangeText={setValue}
      autoFocus
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
