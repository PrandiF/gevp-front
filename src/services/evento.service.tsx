import axios from "axios";

const USER_URL = `http://localhost:5433/api/evento`;

type EventoProps = {
  gimnasio: string;
  deporte: string;
  nombreSocio: string;
  evento: string;
  fecha: string;
  horarioInicio: string;
  horarioFin: string;
};

type FilterProps = {
  gimnasio: string;
  deporte?: string;
  nombreSocio?: string;
  evento?: string;
  fecha: Date | null;
  horarioInicio: string;
  horarioFin: string;
};

export const getEventos = async (page: number = 1) => {
  try {
    const res = await axios.get(`${USER_URL}?page=${page}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener los Eventos:", error);
    throw error;
  }
};

export const getEvento = async () => {
  try {
    const res = await axios.get(`${USER_URL}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    throw error;
  }
};

export const getFilterEvento = async (
  filter: FilterProps,
  page: number = 1
) => {
  // const [response, setResponse] = useState([])
  let filterClean: FilterProps = {
    gimnasio: filter.gimnasio,
    deporte: filter.deporte,
    nombreSocio: filter.nombreSocio,
    fecha: filter.fecha,
    horarioInicio: filter.horarioInicio,
    horarioFin: filter.horarioFin,
  };

  if (
    filter.fecha &&
    new Date(filter.fecha).toLocaleDateString() === "31/12/1899"
  ) {
    filterClean.fecha = null;
  }

  // const newUrl = async () => {
  let stringReq = "";
  Object.keys(filterClean).forEach((key) => {
    if (
      filterClean[key as keyof FilterProps] === "" ||
      filterClean[key as keyof FilterProps] === null
    ) {
      delete filterClean[key as keyof FilterProps];
    } else {
      if (stringReq.includes("?")) {
        stringReq =
          stringReq +
          `&${key}=${filterClean[key as keyof FilterProps]}&page=${page}`;
      } else {
        stringReq =
          stringReq +
          `?${key}=${filterClean[key as keyof FilterProps]}&page=${page}`;
      }
    }
  });
  try {
    const res = await axios.get(`${USER_URL}/filter${stringReq}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error al filtrar el/los evento/s:", error);
    throw error;
  }
  // }
  // newUrl()
  // return response;
};

export const createEvento = async (eventoData: EventoProps) => {
  try {
    const res = await axios.post(
      `${USER_URL}`,
      { ...eventoData },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error al crear el evento:", error);
    throw error;
  }
};

export const getEventoById = async (id: number) => {
  try {
    const res = await axios.get(`${USER_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    throw error;
  }
};

export const deleteEvento = async (id: number) => {
  try {
    const res = await axios.delete(`${USER_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el evento:", error);
    throw error;
  }
};

export const editEvento = async (id: number, data: EventoProps) => {
  try {
    const res = await axios.put(
      `${USER_URL}/${id}`,
      { ...data },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log("Error al editar el evento:", error);
    throw error;
  }
};

export const verificarHorarioDisponible = async (
  gimnasio: string,
  fecha: string,
  horarioInicio: string,
  horarioFin: string
) => {
  try {
    const response = await axios.post(`${USER_URL}/disponibilidad`, {
      gimnasio,
      fecha,
      horarioInicio,
      horarioFin,
    }, { withCredentials: true });

    console.log("Respuesta del servidor:", response.data);

    return response.data.disponible;
  } catch (error) {
    console.error("Error al verificar la disponibilidad:", error);
    return false;
  }
};

