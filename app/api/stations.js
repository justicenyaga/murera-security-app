import client from "./client";

const endpoint = "/stations";

const getStations = (subCountyId) =>
  client.get(`${endpoint}/subCounty/${subCountyId}`);

export default {
  getStations,
};
