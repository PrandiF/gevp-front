import axios from "axios";

const USER_URL = `https://gevp-back-api.onrender.com/api/horario`;

type HorarioProps = {
  gimnasio: string;
  deporte: string;
  categoria: string;
  start: string; // ISO string
  end: string; // ISO string
  // quienCarga: string;
  tipoDeActividad: string;
  recurrence: boolean;

  editMode?: "series" | "single";
  instanceId?: string;
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
    const res = await axios.post(`${USER_URL}`, horarioData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error("El horario ya está ocupado");
    }

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

export const editHorario = async (
  id: number | string,
  horarioData: HorarioProps,
) => {
  try {
    const res = await axios.put(`${USER_URL}/${id}`, horarioData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    console.error("Error al editar el horario:", error);

    if (error.response?.status === 409) {
      throw new Error("No se pudo editar el horario");
    }

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

export const cancelarSerieCompleta = async (horarioId: string) => {
  try {
    const res = await axios.delete(`${USER_URL}/serie/${horarioId}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error al cancelar serie completa:", error);
    throw error;
  }
};

export const cancelarInstance = async (instanceId: string) => {
  try {
    const res = await axios.delete(`${USER_URL}/instance/${instanceId}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error al cancelar instancia:", error);
    throw error;
  }
};
