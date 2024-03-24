import React from "react";
import { ToastProvider } from "react-native-toast-notifications";
import Constants from "expo-constants";
import PropTypes from "prop-types";

import Toast from "./Toast";

const CustomToastProvider = ({ children }) => (
  <ToastProvider
    placement="top"
    duration={5000}
    type="info"
    swipeEnabled
    offsetTop={Constants.statusBarHeight}
    renderType={{
      info: (toast) => <Toast toast={toast} />,
      success: (toast) => (
        <Toast
          toast={toast}
          backgroundColor="#4caf50"
          icon="checkmark-circle"
        />
      ),
      error: (toast) => (
        <Toast toast={toast} backgroundColor="#f44336" icon="alert-circle" />
      ),
    }}
  >
    {children}
  </ToastProvider>
);

CustomToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomToastProvider;
