import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_PROD}/horario`;

type HorarioProps = {
  gimnasio: string;
  deporte: string;
  dia: string;
  categoria: string;
  quienCarga: string;
  horarioInicio: string;
  horarioFin: string;
};
type FilterProps = {
  gimnasio: string;
  deporte: string;
  dia: string;
  categoria?: string;
  horarioInicio: string;
  horarioFin: string;
};

export const getHorarios = async () => {
  try {
    const res = await axios.get(`${USER_URL}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log("Error al obtener los horarios:", error);
    throw error;
  }
};

export const createHorario = async (horarioData: HorarioProps) => {
  try {
    const res = await axios.post(
      `${USER_URL}`,
      { ...horarioData },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log("Error al crear el horario:", error);
    throw error;
  }
};

export const getHorarioById = async (id: number) => {
  try {
    const res = await axios.get(`${USER_URL}/${id}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Error al obtener el horario:", error);
    throw error;
  }
};

export const deleteHorario = async (id: number) => {
  try {
    const res = await axios.delete(`${USER_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el horario:", error);
    throw error;
  }
};

export const editHorario = async (id: number, data: HorarioProps) => {
  try {
    const res = await axios.put(
      `${USER_URL}/${id}`,
      { ...data },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log("Error al editar el horario:", error);
    throw error;
  }
};

export const getFilterHorario = async (filter: FilterProps) => {
  let filterClean: FilterProps = {
    gimnasio: filter.gimnasio,
    deporte: filter.deporte,
    categoria: filter.categoria,
    dia: filter.dia,
    horarioInicio: filter.horarioInicio,
    horarioFin: filter.horarioFin,
  };

  let stringReq = "";
  Object.keys(filterClean).forEach((key) => {
    if (filterClean[key as keyof FilterProps]) {
      if (stringReq) {
        stringReq += `&${key}=${filterClean[key as keyof FilterProps]}`;
      } else {
        stringReq += `?${key}=${filterClean[key as keyof FilterProps]}`;
      }
    }
  });

  try {
    const res = await axios.get(`${USER_URL}/filter${stringReq}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error al filtrar el/los horario/s:", error);
    throw error;
  }
};

export const verificarHorarioDisponible = async (
  gimnasio: string,
  dia: string,
  horarioInicio: string,
  horarioFin: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${USER_URL}/disponibilidad`,
      {
        gimnasio,
        dia,
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
