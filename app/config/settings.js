import { releaseChannel } from "expo-updates";

const settings = {
  dev: {
    apiUrl: "http://192.168.242.228:9000/api",
  },
  staging: {
    apiUrl: "http://example.com/api",
  },
  prod: {
    apiUrl: "http://example.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
