// services/climateService.js

import api from "../lib/api";

export const getClimateDashboard = async () => {
  const response = await api.get("/climate/dashboard");
  return response.data;
};