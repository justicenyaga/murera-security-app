import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

const register = (userInfo) => client.post(endpoint, userInfo);

const checkEmail = (email) => client.post(endpoint + "/check-email", { email });

const checkNationalId = (nationalId) =>
  client.post(endpoint + "/check-nid", { nationalId });

const resendVerification = (email) =>
  client.post(endpoint + "/resend-verification", { email });

export default {
  checkEmail,
  checkNationalId,
  getUser,
  register,
  resendVerification,
};
