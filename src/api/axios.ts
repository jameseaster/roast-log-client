import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/API",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
