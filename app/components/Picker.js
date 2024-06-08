import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import Text from "./Text";
import PickerItem from "./PickerItem";

import defaultStyles from "../config/styles";

const Picker = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [modalVisibal, setModalVisibal] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisibal(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisibal} animationType="slide">
        <View style={styles.modalContainer}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            onPress={() => setModalVisibal(false)}
            style={styles.closeIcon}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                selectedValue={selectedItem?.value}
                onPress={() => {
                  setModalVisibal(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    padding: 15,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

Picker.propTypes = {
  icon: PropTypes.string,
  items: PropTypes.array.isRequired,
  numberOfColumns: PropTypes.number,
  onSelectItem: PropTypes.func.isRequired,
  PickerItemComponent: PropTypes.elementType,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Picker;
