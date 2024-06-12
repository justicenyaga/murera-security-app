import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Icon from "../components/Icon";
import Screen from "../components/Screen";
import UserCard from "../components/UserCard";
import { ListItem, ListItemSeparator } from "../components/lists";

import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  {
    title: "Change Email",
    icon: {
      name: "email-sync",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CHANGE_EMAIL,
  },
  {
    title: "Change Phone Number",
    icon: {
      name: "phone-sync",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.CHANGE_PHONE,
  },
  {
    title: "Change Password",
    icon: {
      name: "lock-reset",
      backgroundColor: "#ffe66d",
    },
    targetScreen: routes.CHANGE_PASSWORD,
  },
];

const AccountScreen = () => {
  const navigation = useNavigation();

  const { logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <UserCard isEdit />
      </View>

      <ListItem
        title="Reported Cases"
        IconComponent={
          <Icon name="format-list-bulleted" backgroundColor="#6c5ce7" />
        }
        onPress={() => navigation.navigate(routes.CASES)}
        style={styles.casesBtn}
      />

      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          style={styles.flatList}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>

      <ListItem
        title="Log Out"
        IconComponent={
          <Icon
            name="logout"
            backgroundColor={colors.white}
            iconColor={colors.danger}
          />
        }
        onPress={() => logOut()}
        titleStyle={styles.logoutTxt}
        style={styles.logoutBtn}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  casesBtn: {
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  container: {
    marginVertical: 20,
  },
  flatList: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  logoutBtn: {
    backgroundColor: colors.danger,
    borderRadius: 15,
    marginTop: 40,
  },
  logoutTxt: {
    color: colors.white,
  },
  screen: {
    backgroundColor: colors.light,
    padding: 15,
  },
});

export default AccountScreen;
