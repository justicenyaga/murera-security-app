import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ProgressStep } from "react-native-progress-steps";
import PropTypes from "prop-types";

import ActivityIndicator from "../ActivityIndicator";
import Button from "../Button";

import colors from "../../config/colors";
import { StepsContext } from "./Steps";

const Step = ({
  children,
  errors = false,
  loading = false,
  nextBtnDisabled = false,
  nextBtnStyle,
  nextBtnText = "Next",
  nextBtnTextStyle,
  onNext = null,
  onPrevious = null,
  previousBtnDisabled = false,
  previousBtnStyle,
  previousBtnText = "Back",
  previousBtnTextStyle,
}) => {
  const { goNext, goPrevious } = useContext(StepsContext);

  const nextHandler = async () => {
    if (onNext) return await onNext();

    goNext();
  };

  const previousHandler = async () => {
    if (onPrevious) return await onPrevious();

    goPrevious();
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <ProgressStep errors={errors} removeBtnRow>
        {children}
      </ProgressStep>

      <View style={styles.buttons}>
        <Button
          backgroundColor={colors.white}
          disabled={previousBtnDisabled}
          onPress={previousHandler}
          style={[styles.previousBtn, previousBtnStyle]}
          title={previousBtnText}
          textStyle={[styles.previousBtnText, previousBtnTextStyle]}
        />

        <Button
          disabled={nextBtnDisabled}
          onPress={nextHandler}
          style={[styles.nextBtn, nextBtnStyle]}
          title={nextBtnText}
          textStyle={[styles.nextBtnText, nextBtnTextStyle]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nextBtn: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    margin: 0,
    width: "fit-content",
  },
  nextBtnText: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  previousBtn: {
    borderRadius: 10,
    margin: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "fit-content",
  },
  previousBtnText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

Step.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.bool,
  loading: PropTypes.bool,
  nextBtnDisabled: PropTypes.bool,
  nextBtnStyle: PropTypes.object,
  nextBtnText: PropTypes.string,
  nextBtnTextStyle: PropTypes.object,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  previousBtnDisabled: PropTypes.bool,
  previousBtnStyle: PropTypes.object,
  previousBtnText: PropTypes.string,
  previousBtnTextStyle: PropTypes.object,
};

export default Step;
