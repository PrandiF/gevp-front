import axios from "axios";

const USER_URL = `https://gevp-back-api.onrender.com/api/usuario`;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(
      `${USER_URL}/login`,
      { username, password },
      { withCredentials: true },
    );

    console.log("Login res.data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// export const entrenadorLogin = async (sport: string) => {
//   try {
//     const res = await axios.post(
//       `${USER_URL}/entrenador`,
//       { sport }, // 👈 ENVIAMOS DEPORTE
//       { withCredentials: true },
//     );

//     return res.data;
//   } catch (error: any) {
//     throw new Error("Error en login entrenador");
//   }
// };

export const logout = async () => {
  try {
    const res = await axios.post(
      `${USER_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
