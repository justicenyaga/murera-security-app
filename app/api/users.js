import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

const register = (userInfo) => {
  const data = new FormData();

  data.append("firstName", userInfo.firstName);
  data.append("lastName", userInfo.lastName);
  data.append("email", userInfo.email);
  data.append("nationalId", userInfo.nationalId);
  data.append("dob", userInfo.dob);
  data.append("phone", userInfo.phone);
  data.append("password", userInfo.password);
  data.append("image", {
    name: "image.jpg",
    type: "image/jpeg",
    uri: userInfo.image,
  });

  return client.post(endpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

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
