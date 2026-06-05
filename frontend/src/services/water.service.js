// services/waterService.js

import api from "../lib/api";

export const getWaterDashboard = async () => {
  const response = await api.get("/water/dashboard");
  return response.data;
};