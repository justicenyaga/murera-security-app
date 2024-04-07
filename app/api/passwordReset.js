import client from "./client";

const endpoint = "/password-reset";

const requestReset = (identifier) => {
  const url = endpoint + "/request";

  return identifier.includes("@")
    ? client.post(url, { email: identifier })
    : client.post(url, { nationalId: identifier });
};

const verifyOtp = (otp) => client.post(endpoint + "/verify-otp", { otp });

const resetPassword = (email, newPassword) =>
  client.post(endpoint, { email, newPassword });

export default {
  requestReset,
  resetPassword,
  verifyOtp,
};
