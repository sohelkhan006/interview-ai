import axios from "axios";

// Create Axios instance with a base URL and enabled cookie/credential tracking
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Register Api function
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Login Api function
export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Logout Api function
export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Logout Api function
export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
