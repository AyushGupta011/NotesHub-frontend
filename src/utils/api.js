
// import axios from "axios";

// const api = axios.create({
//   baseURL:"http://localhost:5050",
// //   withCredentials: true
// });

// export function attachToken(token) {
//   api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token"); 
//   console.log("Attaching token:", token); 
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }  // ✅ must match key name
  
//   return req;
// });

  
// }

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050",
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

export default api;

