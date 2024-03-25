import client from "./client";

const endpoint = "/auth";

const login = (email, password) => client.post(endpoint, { email, password });

const refreshAuthToken = () => client.post(endpoint + "/refresh-token");

export default {
  login,
  refreshAuthToken,
};
