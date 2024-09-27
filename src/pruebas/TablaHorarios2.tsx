import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { getFilterHorario, getHorarios } from "../services/horarios.service";

type HorarioProps = {
  id: number;
  gimnasio: string;
  deporte: string;
  categoria: string;
  dia: string;
  horarioInicio: string;
  horarioFin: string;
};

type FilterProps = {
  filter: {
    gimnasio: string;
    deporte: string;
    categoria: string;
    dia: string;
    horarioInicio: string;
    horarioFin: string;
  };
  isFilter: boolean;
};

function TablaHorarios2({ filter, isFilter }: FilterProps) {
  const navigate = useNavigate();
  const [horarios, setHorarios] = useState<HorarioProps[]>([]);
  const [arrayFilter, setArrayFilter] = useState<HorarioProps[]>([]);
  const [arrayEmpty, setArrayEmpty] = useState(false);

  const { dia, gimnasio } = useParams<{ dia: string; gimnasio: string }>();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const res = await getHorarios();
        if (!res || res.length === 0) {
          setHorarios([]);
          setArrayEmpty(true);
        } else {
          const filteredHorarios = res
            .filter((horario: HorarioProps) => {
              const matchesDia = dia
                ? horario.dia.toLowerCase() === dia.toLowerCase()
                : true;
              const matchesGimnasio = gimnasio
                ? horario.gimnasio.toLowerCase() === gimnasio.toLowerCase()
                : true;
              return matchesDia && matchesGimnasio;
            })
            .sort((a: HorarioProps, b: HorarioProps) =>
              a.horarioInicio.localeCompare(b.horarioInicio)
            );

          setHorarios(filteredHorarios);
          setArrayEmpty(filteredHorarios.length === 0);
        }
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
        setHorarios([]);
        setArrayEmpty(true);
      }
    };

    fetchHorarios();
  }, [dia, gimnasio]);

  useEffect(() => {
    if (isFilter) {
      const fetchFilteredHorarios = async () => {
        try {
          const res = await getFilterHorario(filter);
          if (!res || res.length === 0) {
            setArrayFilter([]);
            setArrayEmpty(true);
          } else {
            const filteredByDia = dia
              ? res.filter(
                  (horario: HorarioProps) =>
                    horario.dia.toLowerCase() === dia.toLowerCase()
                )
              : res;

            const filteredByGimnasio = gimnasio
              ? filteredByDia.filter(
                  (horario: HorarioProps) =>
                    horario.gimnasio.toLowerCase() === gimnasio.toLowerCase()
                )
              : filteredByDia;

            const filteredByHorarioInicio = filter.horarioInicio
              ? filteredByGimnasio.filter(
                  (horario: HorarioProps) =>
                    horario.horarioInicio.slice(0, 5) === filter.horarioInicio
                )
              : filteredByGimnasio;
            const sortedFilteredHorarios = filteredByHorarioInicio.sort(
              (a: HorarioProps, b: HorarioProps) =>
                a.horarioInicio.localeCompare(b.horarioInicio)
            );

            setArrayFilter(sortedFilteredHorarios);
            setArrayEmpty(sortedFilteredHorarios.length === 0);
          }
        } catch (error) {
          console.error("Error al filtrar los horarios:", error);
          setArrayFilter([]);
          setArrayEmpty(true);
        }
      };

      fetchFilteredHorarios();
    } else {
      setArrayEmpty(false);
    }
  }, [isFilter, filter, dia, gimnasio]);

  return (
    <div className="relative xl:w-[80%] w-full">
      <Table className="w-full min-w-full rounded-lg">
        <thead className="bg-button1-gradient opacity-95 text-white xl:text-lg md:text-base text-[13px]">
          <tr className="text-center">
            {" "}
            <th className="py-2 pr-2.5  w-1/4">Horario</th>
            <th className="py-2 pr-2.5 w-1/4">Deporte</th>
            <th className="py-2 pr-2.5 w-1/4 rounded-tr-lg">Categoría</th>
          </tr>
        </thead>
      </Table>
      <div className="max-h-[250px] overflow-y-auto">
        <Table className="w-full min-w-full rounded-lg">
          <tbody className="bg-white opacity-90 text-black xl:text-lg md:text-base text-[12px] rounded-lg font-montserrat">
            {arrayEmpty ? (
              <tr>
                <td colSpan={4} className="text-center py-3">
                  No se encontró ningún entrenamiento.
                </td>
              </tr>
            ) : (
              (isFilter ? arrayFilter : horarios).map(
                (horario: HorarioProps, i) => (
                  <tr key={i} className="text-center">
                    <td className="py-1 border w-1/4">
                      {horario.horarioInicio.slice(0, 5)}hs -{" "}
                      {horario.horarioFin.slice(0, 5)}hs
                    </td>
                    <td className="py-1 border w-1/4">{horario.deporte}</td>
                    <td className="py-1 border w-1/4">
                      <button
                        onClick={() =>
                          navigate(`/entrenamientos/individual/${horario.id}`)
                        }
                        className="mx-auto text-celeste underline  flex items-center justify-center"
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                      >
                        {horario.categoria}
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </Table>
      </div>
      <div className="opacity-95 gap-5 bg-button1-gradient h-12 flex justify-center items-center shadow-xl rounded-b-lg xl:mb-0" />
    </div>
  );
}

export default TablaHorarios2;
