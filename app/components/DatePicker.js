import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";

import defaultStyles from "../config/styles";

import Text from "./Text";

const DatePicker = ({
  date,
  icon,
  placeholder = "",
  setDate,
  width = "100%",
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event, selectedDate) => {
    setOpen(false);
    event.type === "set" && setDate(selectedDate.toISOString().split("T")[0]);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}

          {date ? (
            <Text style={styles.text}>{date}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      {open && (
        <DateTimePicker
          display="spinner"
          mode="date"
          onChange={handleChange}
          value={date ? new Date(date) : new Date()}
          {...rest}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

DatePicker.propTypes = {
  date: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DatePicker;
