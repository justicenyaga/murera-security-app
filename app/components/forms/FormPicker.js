import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

const FormPicker = ({
  icon,
  items,
  name,
  numberOfColumns,
  onItemSelect,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const visible = touched[name]?.value || touched[name];

  const handleSelectItem = (item) => {
    if (onItemSelect) onItemSelect(item);
    setFieldValue(name, item);
  };

  return (
    <>
      <Picker
        icon={icon}
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={handleSelectItem}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={visible} />
    </>
  );
};

FormPicker.propTypes = {
  icon: PropTypes.string,
  items: PropTypes.array.isRequired,
  name: PropTypes.string,
  numberOfColumns: PropTypes.number,
  onItemSelect: PropTypes.func,
  PickerItemComponent: PropTypes.elementType,
  placeholder: PropTypes.string,
  width: PropTypes.string,
};

export default FormPicker;
