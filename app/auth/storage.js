import * as Storage from "expo-secure-store";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await Storage.setItemAsync(key, authToken);
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    return await Storage.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await Storage.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

export default { getToken, removeToken, storeToken };
