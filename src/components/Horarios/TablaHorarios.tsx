import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { getFilterHorario, getHorarios } from "../../services/horarios.service";
import EditButton from "../../commons/EditButton";

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
  pageTotal: number;
  pageFilter: number;
};

function TablaHorarios({
  filter,
  isFilter,
  pageTotal,
  pageFilter,
}: FilterProps) {
  const navigate = useNavigate();
  const [horarios, setHorarios] = useState<HorarioProps[]>([]);
  const [arrayFilter, setArrayFilter] = useState<HorarioProps[]>([]);
  const [arrayEmpty, setArrayEmpty] = useState(false);

  const { dia } = useParams<{ dia: string }>();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const res = await getHorarios(pageTotal);
        if (!res || res.length === 0) {
          setHorarios([]);
          setArrayEmpty(true);
        } else {
          const filteredHorarios = dia
            ? res.filter(
                (horario: HorarioProps) =>
                  horario.dia.toLowerCase() === dia.toLowerCase()
              )
            : res;
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
  }, [pageTotal, dia]);

  useEffect(() => {
    if (isFilter) {
      const fetchFilteredHorarios = async () => {
        try {
          const res = await getFilterHorario(filter, pageFilter);
          if (!res || res.length === 0) {
            setArrayFilter([]);
            setArrayEmpty(true);
          } else {
            const filteredByDay = dia
              ? res.filter(
                  (horario: HorarioProps) =>
                    horario.dia.toLowerCase() === dia.toLowerCase()
                )
              : res;
            setArrayFilter(filteredByDay);
            setArrayEmpty(filteredByDay.length === 0);
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
  }, [isFilter, pageFilter, filter, dia]);

  return (
    <div className="relative xl:w-[80%] w-[98%]">
      <Table className="w-full min-w-full rounded-lg">
        <thead className="bg-button1-gradient opacity-95 text-white xl:text-lg md:text-base text-[13px]">
          <tr className="text-center">
            <th className="py-2 border-r rounded-tl-lg">Gimnasio</th>
            <th className="py-2 border-r">Deporte</th>
            <th className="py-2 border-r">Categoría</th>
            <th className="py-2 rounded-tr-lg">Horario</th>
          </tr>
        </thead>
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
                <tr key={i} className="text-center relative">
                  <td className="py-1 border">{horario.gimnasio}</td>
                  <td className="py-1 border">{horario.deporte}</td>
                  <td className="py-1 border">{horario.categoria}</td>
                  <td className="py-1 border">
                    {horario.horarioInicio.slice(0, 5)}hs -{" "}
                    {horario.horarioFin.slice(0, 5)}hs
                  </td>

                  <div className="absolute ml-2 mt-1">
                    <EditButton
                      onClick={() =>
                        navigate(`/entrenamientos/individual/${horario.id}`)
                      }
                      text="Ver"
                      icon={false}
                    />
                  </div>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TablaHorarios;
