import client from "./client";

const endpoint = "/counties";
const subEndpoint = "/subcounties";

const getCounties = () => client.get(endpoint);

const getSubCounties = (countyCode) =>
  client.get(`${subEndpoint}/county/${countyCode}`);

export default {
  getCounties,
  getSubCounties,
};
