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
            // Filtrado adicional para incluir el horario seleccionado en el rango del evento (excluyendo horarioFin)
            const filteredEventos = res.data.filter((evento: EventoProps) => {
              // Convertir horarios a formato Date para facilitar comparaciones
              const [inicioHours, inicioMinutes] = evento.horarioInicio.split(":").map(Number);
              const [finHours, finMinutes] = evento.horarioFin.split(":").map(Number);
              
              // Crear fechas con horas y minutos para inicio y fin del evento
              const inicio = new Date(evento.fecha);
              inicio.setHours(inicioHours, inicioMinutes, 0, 0);
              
              const fin = new Date(evento.fecha);
              fin.setHours(finHours, finMinutes, 0, 0);
  
              // Convertir el horario de filtro a Date
              const [filterHours, filterMinutes] = filter.horarioInicio.split(":").map(Number);
              const selectedTime = new Date(evento.fecha);
              selectedTime.setHours(filterHours, filterMinutes, 0, 0);
  
              // Verificar si el horario seleccionado está dentro del rango (excluyendo fin)
              return selectedTime >= inicio && selectedTime < fin;
            });
  
            setArrayFilter(filteredEventos);
            setArrayEmpty(false);
          }
        });
      } catch (error) {
        console.error(error);
        setArrayFilter([]);
        setArrayEmpty(true);
      }
    }
  }, [isFilter, pageFilter, filter]);

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
      <tbody className="bg-white opacity-90 text-black xl:text-lg md:text-base text-[12px] w-full rounded-lg font-montserrat ">
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
