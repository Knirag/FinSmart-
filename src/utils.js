// utils.js
export const baseUrl =
  !import.meta.env.PROD
    ? "http://localhost:9000/api/v1"
    : "https://finsmart-42713dec77e2.herokuapp.com/api/v1";
