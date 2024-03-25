import client from "./client";

const endpoint = "/users";

const register = (userInfo) => client.post(endpoint, userInfo);

const resendVerification = (email) =>
  client.post(endpoint + "/resend-verification", { email });

export default {
  register,
  resendVerification,
};
