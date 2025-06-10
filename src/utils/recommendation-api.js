// recommendation-api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://coffee-macth.my.id",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRecommendationsById = async (id) => {
  try {
    const response = await api.post("/ml/", { id });

    if (response.data && Array.isArray(response.data.recommendations)) {
      const cleaned = response.data.recommendations.map((item) => ({
        ...item,
        image: typeof item.image === "string" ? item.image : null, // ubah NaN jadi null
      }));
      console.log("✅ API success, cleaned recommendations:", cleaned);
      return cleaned;
    } else {
      console.warn("⚠️ API success, tapi tidak ada rekomendasi:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Gagal mengambil rekomendasi:", error.response?.data || error.message);
    return [];
  }
};
