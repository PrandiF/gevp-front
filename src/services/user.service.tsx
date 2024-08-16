import axios from "axios";

const USER_URL = `http://localhost:5433/api/usuario`;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(
      `${USER_URL}/login`,
      { username, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
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
