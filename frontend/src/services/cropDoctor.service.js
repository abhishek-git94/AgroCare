import api from "../lib/api";

export const getCropHistory = async () => {
  const response = await api.get("/crop-doctor/history");
  return response.data;
};

export const diagnoseCrop = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/crop-doctor/diagnose",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};