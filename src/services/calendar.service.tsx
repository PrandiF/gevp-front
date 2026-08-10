import axios from "axios";
import API_URL from "../config/api";

export const getEvents = async (sport?: string) => {
  const url = sport
    ? `${API_URL}/calendar/events?sport=${sport}`
    : `${API_URL}/calendar/events`;

  const res = await axios.get(url);

  return res.data;
};
