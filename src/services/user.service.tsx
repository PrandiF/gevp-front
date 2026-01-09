import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_DEV}/usuario`;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(
      `${USER_URL}/login`,
      { username, password },
      { withCredentials: true }
    );

    console.log("Login res.data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const socioLogin = async () => {
  try {
    const res = await axios.post(
      `${USER_URL}/socio`,
      {},
      { withCredentials: true }
    );

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
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
