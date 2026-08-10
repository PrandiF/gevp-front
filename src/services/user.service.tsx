import axios from "axios";
import API_URL from "../config/api";

const USER_URL = `${API_URL}/usuario`;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(
      `${USER_URL}/login`,
      { username, password },
      { withCredentials: true },
    );

    const { token } = res.data;

    // 🔥 guardar token para fallback Safari
    if (token) {
      localStorage.setItem("token", token);
    }

    console.log("Login res.data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(
      `${USER_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    // 🧹 limpiar token al hacer logout
    localStorage.removeItem("token");

    return res.data;
  } catch (error) {
    throw error;
  }
};
