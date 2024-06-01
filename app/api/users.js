import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

const register = (userInfo) => client.post(endpoint, userInfo);

const checkContacts = (contacts) =>
  client.post(endpoint + "/check-contacts", contacts);

const checkNationalId = (nationalId) =>
  client.post(endpoint + "/check-nid", { nationalId });

const resendVerification = (email) =>
  client.post(endpoint + "/resend-verification", { email });

export default {
  checkContacts,
  checkNationalId,
  getUser,
  register,
  resendVerification,
};
