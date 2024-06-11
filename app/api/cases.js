import client from "./client";

const endpoint = "/cases";

const report = (details) => client.post(endpoint, details);

const getCases = () => client.get(endpoint + "/user");

export default {
  getCases,
  report,
};
