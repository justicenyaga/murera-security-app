import client from "./client";

const endpoint = "/users";

const register = (userInfo) => client.post(endpoint, userInfo);

const resendVerification = (email) =>
  client.post(endpoint + "/resend-verification", { email });

const refreshAuthToken = () => client.post(endpoint + "/refresh-token");

export default {
  refreshAuthToken,
  register,
  resendVerification,
};
