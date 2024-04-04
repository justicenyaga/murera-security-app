import client from "./client";

const endpoint = "/users";

const register = (userInfo) => client.post(endpoint, userInfo);

const checkNationalId = (nationalId) =>
  client.post(endpoint + "/check-nid", { nationalId });

const resendVerification = (email) =>
  client.post(endpoint + "/resend-verification", { email });

export default {
  checkNationalId,
  register,
  resendVerification,
};
