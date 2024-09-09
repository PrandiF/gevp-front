import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { getFilterEvento, getEventos } from "../../services/evento.service";
import { useEffect, useState } from "react";

type EventoProps = {
  id: number;
  gimnasio: string;
  deporte: string;
  nombreSocio: string;
  evento: string;
  fecha: Date;
  horarioInicio: string;
  horarioFin: string;
};

type FilterProps = {
  filter: {
    gimnasio: string;
    deporte?: string;
    nombreSocio?: string;
    evento?: string;
    fecha: Date;
    horarioInicio: string;
    horarioFin: string;
  };
  isFilter: boolean;
  pageTotal: number;
  pageFilter: number;
};

function TablaConsulta({
  filter,
  isFilter,
  pageTotal,
  pageFilter,
}: FilterProps) {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const [arrayFilter, setArrayFilter] = useState<EventoProps[]>([]);
  const [arrayEmpty, setArrayEmpty] = useState(false);

  useEffect(() => {
    try {
      getEventos(pageTotal).then((res) => {
        if (!res || res.length === 0) {
          setEventos([]);
          setArrayEmpty(true);
        } else {
          setEventos(res);
          setArrayEmpty(false);
        }
      });
    } catch (error) {
      console.error(error);
      setEventos([]);
      setArrayEmpty(true);
    }
  }, [pageTotal]);

  useEffect(() => {
    if (isFilter) {
      try {
        getFilterEvento(filter, pageFilter).then((res) => {
          if (!res || res.length === 0) {
            setArrayFilter([]);
            setArrayEmpty(true);
          } else {
            setArrayFilter(res.data);
            setArrayEmpty(false);
          }
        });
      } catch (error) {
        console.error(error);
        setArrayFilter([]);
        setArrayEmpty(true);
      }
    }
  }, [isFilter, pageFilter]);

  const isEventPast = (fecha: Date, horarioFin: string) => {
    const now = new Date();
    const eventEnd = new Date(fecha);
    const [hours, minutes] = horarioFin.split(":").map(Number);
    eventEnd.setHours(hours, minutes, 0, 0);
    return now > eventEnd;
  };

  return (
    <Table className="xl:w-[90%] w-[98%] rounded-lg">
      <thead className="bg-button1-gradient opacity-95 text-white xl:text-lg md:text-base text-[13px] rounded-t-lg">
        <tr className="text-center rounded-t-lg">
          <th className="w-[16%] py-2 border-r rounded-tl-lg">Gimnasio</th>
          <th className="w-[16%] py-2 border-r">Deporte</th>
          <th className="w-[16%] py-2 border-r">Evento</th>
          <th className="w-[16%] py-2 border-r">Fecha</th>
          <th className="w-[16%] py-2 rounded-tr-lg">Horario</th>
        </tr>
      </thead>
      <tbody className="bg-white opacity-90 text-black xl:text-lg md:text-base text-[12px] w-full rounded-lg font-montserrat">
        {arrayEmpty ? (
          <tr>
            <td colSpan={5} className="text-center py-3">
              No se encontró ningún evento.
            </td>
          </tr>
        ) : (
          <>
            {(eventos && !isFilter ? eventos : arrayFilter).map((evento: EventoProps, i) => (
              <tr
                key={i}
                className={`text-center ${isEventPast(evento.fecha, evento.horarioFin) ? 'bg-red-200' : ''}`}
              >
                <td className="w-[16%] py-1 border">{evento.gimnasio}</td>
                <td className="w-[16%] py-1 border">{evento.deporte}</td>
                <td className="w-[16%] py-1 border">
                  <button
                    onClick={() =>
                      navigate(`/eventos/individual/${evento.id}`)
                    }
                    className="text-celeste underline"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                  >
                    {evento.evento}
                  </button>
                </td>
                <td className="py-1 border">
                  {new Date(
                    new Date(evento.fecha).setDate(
                      new Date(evento.fecha).getDate() + 1
                    )
                  ).toLocaleDateString()}
                </td>
                <td className="w-[16%] py-1 border">
                  {evento.horarioInicio.slice(0, 5)}hs -{" "}
                  {evento.horarioFin.slice(0, 5)}hs
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Table>
  );
}

export default TablaConsulta;
