import { useContext } from "react";
import { useToast } from "react-native-toast-notifications";

import authStorage from "./storage";
import AuthContext from "./context";
import usersApi from "../api/users";

export default function () {
  const toast = useToast();

  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    await authStorage.storeToken(authToken);
    const { ok, data } = await usersApi.getUser();
    if (ok) setUser(data);
    else toast.show(data, { type: "error" });
  };

  const refreshUser = async () => {
    const { ok, data } = await usersApi.getUser();
    if (ok) setUser(data);
    else toast.show(data, { type: "error" });
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut, refreshUser };
}
