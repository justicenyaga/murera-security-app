import client from "./client";

const endpoint = "/auth";

const login = (identifier, password) => {
  return identifier.includes("@")
    ? client.post(endpoint, { email: identifier, password })
    : client.post(endpoint, { nationalId: identifier, password });
};

const refreshAuthToken = () => client.post(endpoint + "/refresh-token");

export default {
  login,
  refreshAuthToken,
};
