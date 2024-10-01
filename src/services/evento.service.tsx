import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_PROD}/evento`;

type EventoProps = {
  gimnasio: string;
  deporte: string;
  nombreSocio: string;
  evento: string;
  fecha: Date;
  quienCarga: string;
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
  let filterClean: FilterProps = {
    deporte: filter.deporte,
    gimnasio: filter.gimnasio,
    fecha: filter.fecha,
    horarioInicio: filter.horarioInicio,
    horarioFin: filter.horarioFin,
  };

  if (
    filterClean.fecha &&
    new Date(filterClean.fecha).toLocaleDateString() === "31/12/1899"
  ) {
    filterClean.fecha = null;
  }

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
    return res.data;
  } catch (error) {
    console.error("Error al filtrar el/los evento/s:", error);
    throw error;
  }
};

export const createEvento = async (eventoData: EventoProps) => {
  try {
    const res = await axios.post(
      `${USER_URL}`,
      { ...eventoData },
      { withCredentials: true }
    );
    console.log("Nuevo evento:", res.data);
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
  fecha: Date,
  horarioInicio: string,
  horarioFin: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${USER_URL}/disponibilidad`,
      {
        gimnasio,
        fecha,
        horarioInicio,
        horarioFin,
      },
      { withCredentials: true }
    );

    console.log("Respuesta del servidor:", response.data);

    if (response.data && typeof response.data.disponible === "boolean") {
      return response.data.disponible;
    } else {
      console.error("Respuesta inesperada del servidor:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error al verificar la disponibilidad:", error);
    return false;
  }
};
