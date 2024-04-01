import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  form: {
    desc: {
      color: colors.medium,
      textAlign: "center",
      marginBottom: 20,
    },
    heading: {
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 7,
      textAlign: "center",
    },
    logo: {
      alignSelf: "center",
      height: 80,
      marginBottom: 20,
      marginTop: 50,
      width: 80,
    },
  },
};
