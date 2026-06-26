import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/googleCalendarCss.css";
import esLocale from "@fullcalendar/core/locales/es";
import { getEvents } from "../../services/calendar.service";
import { useUserStoreLocalStorage } from "../../store/userStore";
import Header from "../Header";
import EventHoverPreview from "../../commons/HoverPreviewModal";
import ConfirmCancelModal from "../../commons/ConfirmCancelModal";
import {
  cancelarSerieCompleta,
  cancelarInstance,
} from "../../services/horarios.service";
import { useParams, Navigate } from "react-router-dom";

/* =========================
   TYPES
========================= */

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  deporte: string | null;
  categoria: string | null;
  gimnasio: string | null;
  quienCarga: string | null;
  recurringEventId?: string;
};

/* =========================
   DEPORTES DEL CLUB
========================= */

const CLUB_SPORTS = [
  { value: "all", label: "Todos" },
  { value: "Cesto", label: "Cesto" },
  { value: "Gimnasia Rítmica", label: "Gimnasia Rítmica" },
  { value: "Voley Femenino", label: "Voley Femenino" },
  { value: "Voley Masculino", label: "Voley Masculino" },
  { value: "Básquet", label: "Básquet" },
  { value: "No Federados", label: "No Federados" },
  { value: "Otras Actividades", label: "Otras Actividades" },
];

/* =========================
   GIMNASIOS DEL CLUB
========================= */

const CLUB_GYMS = [
  { value: "all", label: "Todos" },
  { value: "Gimnasio 1", label: "Gimnasio 1" },
  { value: "Gimnasio 2", label: "Gimnasio 2" },
  { value: "Monza", label: "Monza" },
  { value: "Alix", label: "Alix" },
  { value: "Terracita", label: "Terracita" },
  { value: "Subsuelo", label: "Subsuelo" },
  { value: "Salón Social", label: "Salón Social" },
];

/* =========================
   COLOR POR DEPORTE
========================= */

const sportColors: Record<string, string> = {
  Cesto: "#34A853",
  "Gimnasia Rítmica": "#9C27B0",
  "Voley Femenino": "#b68904ff",
  "Voley Masculino": "#FBBC05",
  Básquet: "#0066CC",
  "No Federados": "#F44336",
  "Otras Actividades": "#00c0b3",
};

const isRecurringInstance = (eventId: string) => {
  return eventId.includes("_");
};

/* =========================
   COMPONENT
========================= */

export default function ClubCalendar() {
  const { role, sport, isAuthenticated } = useUserStoreLocalStorage();
  const { sport: sportFromUrl } = useParams();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedGym, setSelectedGym] = useState<string>("all");

  const [hoveredEvent, setHoveredEvent] = useState<any | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [calendarKey, setCalendarKey] = useState(0);

  /* =========================
     LABEL DEPORTE
  ========================= */

  const selectedSportLabel = useMemo(() => {
    return CLUB_SPORTS.find((s) => s.value === selectedSport)?.label ?? "Todos";
  }, [selectedSport]);

  useEffect(() => {
    if (role === "entrenador" && sport) {
      setSelectedSport(sport);
    }
  }, [role, sport]);

  /* =========================
     LOAD EVENTS (FUENTE REAL)
  ========================= */

  const loadEvents = async () => {
    if (!isAuthenticated) return;
    if (role === "entrenador" && !sport) return;

    setLoading(true);

    try {
      let data: CalendarEvent[] = [];

      if (role === "entrenador") {
        data = await getEvents(sport ?? undefined);
      } else {
        data =
          selectedSport === "all"
            ? await getEvents()
            : await getEvents(selectedSport);
      }

      setEvents(Array.isArray(data) ? data : []);

      // ⭐ IMPORTANTE
      setCalendarKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [isAuthenticated, role, sport, selectedSport]);

  /* =========================
     EVENTOS → FULLCALENDAR
  ========================= */

  const calendarEvents = useMemo(() => {
    return events
      .filter((event) => {
        const sportMatch =
          selectedSport === "all" || event.deporte === selectedSport;

        const gymMatch =
          selectedGym === "all" || event.gimnasio === selectedGym;

        return sportMatch && gymMatch;
      })
      .map((event) => {
        const start = new Date(event.start).toISOString();
        const end = new Date(event.end).toISOString();

        return {
          id: event.id,
          title: " ",
          start,
          end,
          display: "block",

          extendedProps: {
            ...event,
            start,
            end,
          },

          backgroundColor: sportColors[event.deporte ?? ""] || "#546E7A",
          borderColor: sportColors[event.deporte ?? ""] || "#546E7A",
        };
      });
  }, [events, selectedSport, selectedGym]);

  /* =========================
     TITULO
  ========================= */

  const calendarTitle =
    role === "entrenador"
      ? `Calendario ${sport}`
      : selectedSport === "all"
        ? "Calendario del Club"
        : `${selectedSportLabel}`;

  /* =========================
     CANCELAR SERIE
  ========================= */
  const handleCancelTraining = async () => {
    if (!selectedEvent) return;

    try {
      // 🔥 usamos el ID REAL de Google
      const seriesId = selectedEvent.recurringEventId ?? selectedEvent.id;

      await cancelarSerieCompleta(seriesId);

      await loadEvents();

      setConfirmOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error("Error cancelando serie:", err);
    }
  };

  /* =========================
     CANCELAR INSTANCIA
  ========================= */

  const handleCancelSingle = async () => {
    if (!selectedEvent) return;

    try {
      // Google espera el instanceId completo
      await cancelarInstance(selectedEvent.id);

      await loadEvents();

      setConfirmOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error("Error cancelando instancia:", err);
    }
  };

  /* =========================
     HEADER CUSTOM
  ========================= */

  const CalendarHeader = () => (
    <div className="flex items-center justify-between mb-4 px-2">
      <h2 className="xl:text-xl font-semibold text-gray-800">
        {calendarTitle}
      </h2>

      {role === "admin" && (
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Gimnasio</label>

            <select
              value={selectedGym}
              onChange={(e) => setSelectedGym(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 text-black cursor-pointer"
            >
              {CLUB_GYMS.map((gym) => (
                <option key={gym.value} value={gym.value}>
                  {gym.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Deporte</label>

            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 text-black cursor-pointer"
            >
              {CLUB_SPORTS.map((sport) => (
                <option key={sport.value} value={sport.value}>
                  {sport.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );

  /* =========================
     RENDER
  ========================= */
  if (
    role === "entrenador" &&
    sport &&
    sportFromUrl &&
    sportFromUrl !== sport
  ) {
    return <Navigate to={`/calendario/${sport}`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col z-10 gap-8">
      <Header />

      <div className="flex flex-col items-center w-full px-4 py-4 xl:mt-[6%] mt-[15%]">
        <div className="w-full  bg-white rounded-xl shadow-md p-4 relative">
          <CalendarHeader />

          {loading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
              Actualizando calendario...
            </div>
          )}

          <FullCalendar
            key={calendarKey}
            timeZone="local"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locale={esLocale}
            height="80vh"
            nowIndicator
            allDaySlot={false}
            expandRows
            stickyHeaderDates
            slotMinTime="08:00:00"
            slotMaxTime="23:00:00"
            slotDuration="00:30:00"
            events={calendarEvents}
            eventContent={(arg) => {
              const e = arg.event.extendedProps;

              return (
                <div className="text-xs leading-tight px-1 text-white">
                  <div className="font-semibold truncate">
                    {e.deporte?.toUpperCase()}
                  </div>
                  <div className="truncate">{e.categoria}</div>
                  <div className="opacity-90 truncate">{e.gimnasio}</div>
                  <div className="flex gap-2 text-center">
                    <p className="text-sm mt-1 opacity-90">
                      {`${new Date(e.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })} hs`}
                    </p>
                    -
                    <p className="text-sm mt-1 opacity-90">
                      {`${new Date(e.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })} hs`}
                    </p>
                  </div>
                </div>
              );
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: false,
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventClick={(info) => {
              const rect = info.el.getBoundingClientRect();

              const original = events.find((e) => e.id === info.event.id);

              if (!original) return;

              setHoveredEvent(original);

              setHoverPosition({
                x: rect.right + 10,
                y: rect.top,
              });
            }}
          />
        </div>
      </div>

      {hoveredEvent && (
        <EventHoverPreview
          event={hoveredEvent}
          position={hoverPosition}
          onClose={() => {
            setHoveredEvent(null);
          }}
          onCancelClick={() => {
            setSelectedEvent(hoveredEvent);
            setHoveredEvent(null);
            setConfirmOpen(true);
          }}
        />
      )}

      <ConfirmCancelModal
        open={confirmOpen}
        event={selectedEvent}
        isInstance={
          selectedEvent ? isRecurringInstance(selectedEvent.id) : false
        }
        onClose={() => setConfirmOpen(false)}
        onDeleteSingle={handleCancelSingle}
        onDeleteSeries={handleCancelTraining}
      />
    </div>
  );
}
