import axios from "axios";
// const API_BASE = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://noteshub-backend-cd3h.onrender.com/",
   withCredentials: true,
});

export function attachToken() {
  api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    console.log("Attaching token:", token);

    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`; // ✅ attach to request
    } else {
      delete req.headers["Authorization"];
    }

    return req;
  });
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint
        const r = await api.get("/api/auth/refresh");
        const newToken = r.data.accessToken;

        // Save new token
        localStorage.setItem("token", newToken);
        attachToken(); // reattach new token

        // Retry original request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh token failed", refreshErr);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload(); // force logout
      }
    }
    return Promise.reject(err);
  }
);


export default api;

