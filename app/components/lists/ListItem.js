import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import PropTypes from "prop-types";

import Text from "../Text";

import colors from "../../config/colors";

const ListItem = ({
  image,
  onPress,
  renderRightActions,
  style,
  subTitle,
  title,
  titleStyle,
  IconComponent,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}

          <View style={styles.detailsContainer}>
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

ListItem.propTypes = {
  image: PropTypes.string,
  onPress: PropTypes.func,
  renderRightActions: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  subTitle: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  IconComponent: PropTypes.element,
};

export default ListItem;
