import client from "./client";

const endpoint = "/cases";

const report = (details) => client.post(endpoint, details);

export default {
  report,
};
