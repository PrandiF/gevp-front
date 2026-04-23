import axios from "axios";

const API = "https://gevp-back-api.onrender.com/api";

export const getEvents = async (sport?: string) => {
  const url = sport
    ? `${API}/calendar/events?sport=${sport}`
    : `${API}/calendar/events`;

  const res = await axios.get(url);

  console.log("RESPUESTA AXIOS COMPLETA:", res);
  console.log("DATA:", res.data);
  return res.data;
};
