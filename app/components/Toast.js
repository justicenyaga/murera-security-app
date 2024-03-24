import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import * as Progress from "react-native-progress";

const Toast = ({
  toast,
  icon = "information-circle",
  backgroundColor = "#2196f3",
}) => {
  const allowance = 400; // ms
  const decrement = 100 / (toast.duration - allowance);

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((prev) => Math.max(prev - decrement, 0)),
      100,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.toast}>
      <View style={[styles.container, { backgroundColor }]}>
        <Ionicons name={icon} size={20} color="white" />
        <Text style={styles.text}>{toast.message}</Text>
      </View>
      <Progress.Bar
        progress={progress}
        borderWidth={0}
        color="#d1d1d1"
        animationType="spring"
        width={null}
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
  },
  progressBar: {
    borderRadius: 5,
    height: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: -4,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: "90%",
    marginLeft: 10,
  },
  toast: {
    marginVertical: 5,
    width: "90%",
  },
});

Toast.propTypes = {
  toast: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  icon: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Toast;
