import client from "./client";

const endpoint = "/users";

const register = (userInfo) => client.post(endpoint, userInfo);

const resendVerification = (email) =>
  client.post(endpoint + "/resend-verification", { email });

const passwordResetRequest = (identifier) => {
  const url = endpoint + "/password-reset-request";

  return identifier.includes("@")
    ? client.post(url, { email: identifier })
    : client.post(url, { nationalId: identifier });
};

export default {
  passwordResetRequest,
  register,
  resendVerification,
};
