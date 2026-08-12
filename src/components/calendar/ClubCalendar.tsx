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
import { ClipLoader } from "react-spinners";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { IoBasketballOutline } from "react-icons/io5";
import BackButton from "../../commons/BackButton";

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
  tipoDeActividad: string | null;
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

const sportIcons: Record<string, string> = {
  Básquet: "🏀",
  "Voley Femenino": "🏐",
  "Voley Masculino": "🏐",
  Cesto: "🏐",
  "Gimnasia Rítmica": "🤸",
  "Otras Actividades": "🏋️",
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
  const [loadingText, setLoadingText] = useState("");

  const [calendarKey, setCalendarKey] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      setCalendarKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setEvents([]);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingText("Actualizando calendario...");
      setLoading(true);

      try {
        await loadEvents();
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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
        return {
          id: event.id,
          title: " ",
          start: event.start,
          end: event.end,
          display: "block",

          extendedProps: {
            ...event,
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

    const seriesId = selectedEvent.recurringEventId ?? selectedEvent.id;

    setConfirmOpen(false);
    setSelectedEvent(null);

    setLoadingText("Cancelando actividad...");
    setLoading(true);

    try {
      await cancelarSerieCompleta(seriesId);

      setLoadingText("Actualizando calendario...");

      await loadEvents();
    } catch (err) {
      console.error("Error cancelando serie:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CANCELAR INSTANCIA
  ========================= */

  const handleCancelSingle = async () => {
    if (!selectedEvent) return;

    const eventId = selectedEvent.id;

    setConfirmOpen(false);
    setSelectedEvent(null);

    setLoadingText("Cancelando actividad...");
    setLoading(true);

    try {
      await cancelarInstance(eventId);

      setLoadingText("Actualizando calendario...");

      await loadEvents();
    } catch (err) {
      console.error("Error cancelando instancia:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedGym("all");
    setSelectedSport("all");
  };

  /* =========================
     HEADER CUSTOM
  ========================= */

  const CalendarHeader = () => (
    <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-3 flex-col">
        {role === "admin" && (
          <div className="pl-4 md:pt-0 pt-2">
            <BackButton />
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm xl:px-5 xl:py-4">
          <div className="rounded-xl bg-[#157cbc]/10 p-2">
            <div className="flex items-center gap-3">
              <HiOutlineCalendarDays className="text-2xl text-[#157cbc]" />
              <h2 className="text-xl xl:text-2xl font-bold tracking-tight text-slate-800">
                {calendarTitle}
              </h2>
            </div>
          </div>

          <div>
            <p className="mt-1 text-slate-500 text-sm xl:text-base">
              Entrenamientos, partidos y disponibilidad de espacios deportivos.
            </p>
          </div>
        </div>
      </div>
      {/* Título */}

      {/* Filtros */}
      {role === "admin" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <HiOutlineAdjustmentsHorizontal
                  className="text-[#157cbc]"
                  size={18}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">Filtros</p>

                <p className="text-xs text-slate-500">
                  Filtrá actividades por gimnasio o deporte.
                </p>
              </div>
            </div>

            {(selectedGym !== "all" || selectedSport !== "all") && (
              <button
                onClick={clearFilters}
                className="rounded-lg px-3 py-1 text-xs font-semibold text-[#157cbc] transition hover:bg-blue-50 hover:text-[#0f6ca6]"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-5">
            {/* Gimnasio */}
            <div className="flex flex-col gap-1">
              <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <HiOutlineBuildingOffice2
                  size={15}
                  className="text-[#157cbc]"
                />
                Gimnasio
              </label>

              <select
                value={selectedGym}
                onChange={(e) => setSelectedGym(e.target.value)}
                className="w-full xl:w-40 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-[#157cbc] hover:shadow-md focus:border-[#157cbc] focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
              >
                {CLUB_GYMS.map((gym) => (
                  <option key={gym.value} value={gym.value}>
                    {gym.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Deporte */}
            <div className="flex flex-col gap-1">
              <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <IoBasketballOutline size={15} className="text-[#157cbc]" />
                Deporte
              </label>

              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full xl:w-40 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-[#157cbc] hover:shadow-md focus:border-[#157cbc] focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
              >
                {CLUB_SPORTS.map((sport) => (
                  <option key={sport.value} value={sport.value}>
                    {sport.label}
                  </option>
                ))}
              </select>
            </div>
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

  const renderDesktopEvent = (arg: any) => {
    const e = arg.event.extendedProps;

    const start = arg.event.start;
    const end = arg.event.end;

    const startTime = start
      ? start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "--";

    const endTime = end
      ? end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "--";

    return (
      <div className="flex h-full flex-col justify-between overflow-hidden p-1.5 text-white">
        <div>
          <p className="flex items-center gap-1 truncate text-[11px] font-bold uppercase tracking-wide">
            <span>{sportIcons[e.deporte] ?? "🏟️"}</span>
            <span>{e.deporte}</span>
          </p>

          <p className="mt-0.5 truncate text-[12px] font-medium">
            {e.categoria}
          </p>

          <div className="mt-1 flex items-center gap-1 opacity-80">
            <HiOutlineMapPin size={11} className="flex-shrink-0" />
            <span className="truncate">{e.gimnasio}</span>
          </div>

          {e.tipoDeActividad && (
            <div className="mt-1 flex items-center gap-1 opacity-80">
              <HiOutlineClipboardDocumentList
                size={11}
                className="flex-shrink-0"
              />
              <span className="truncate">{e.tipoDeActividad}</span>
            </div>
          )}
        </div>

        <div className="mt-2 text-[11px] font-semibold opacity-95">
          {startTime}hs — {endTime}hs
        </div>
      </div>
    );
  };

  const renderMobileEvent = (arg: any) => {
    const e = arg.event.extendedProps;

    const start = arg.event.start;
    const end = arg.event.end;

    const startTime = start
      ? start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "--";

    const endTime = end
      ? end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "--";

    return (
      <div className="flex h-full flex-col justify-between overflow-hidden px-1 py-0.5 text-white">
        <div>
          <p className="flex items-center gap-1 truncate text-[11px] font-bold uppercase tracking-wide">
            <span>{sportIcons[e.deporte] ?? "🏟️"}</span>
            <span>{e.deporte}</span>
          </p>

          <p className="mt-0.5 truncate text-[12px] font-medium">
            {e.categoria}
          </p>

          <div className="mt-1 flex items-center gap-1 opacity-80">
            <HiOutlineMapPin size={11} className="flex-shrink-0" />
            <span className="truncate">{e.gimnasio}</span>
          </div>

          {e.tipoDeActividad && (
            <div className="mt-1 flex items-center gap-1 opacity-80">
              <HiOutlineClipboardDocumentList
                size={11}
                className="flex-shrink-0"
              />
              <span className="truncate">{e.tipoDeActividad}</span>
            </div>
          )}
        </div>

        <div className="text-[9px] font-medium opacity-90">
          {startTime}hs - {endTime}hs
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden z-10">
      <Header />

      <div className="flex-1 min-h-0 flex flex-col items-center w-full px-4 pt-28 pb-4">
        <div className="flex-1 min-h-0 w-full rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 p-3 md:p-6 relative flex flex-col overflow-auto">
          <CalendarHeader />

          {loading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
              <ClipLoader size={45} color="#157cbc" />

              <p className="mt-3 font-medium text-slate-600">{loadingText}</p>
            </div>
          )}

          <div className="flex-1 min-h-0">
            <FullCalendar
              key={calendarKey}
              timeZone="local"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
              locale={esLocale}
              height={isMobile ? "auto" : "100%"}
              nowIndicator
              allDaySlot={false}
              expandRows
              stickyHeaderDates
              slotMinTime="08:00:00"
              slotMaxTime="24:00:00"
              slotDuration="00:30:00"
              events={calendarEvents}
              eventContent={(arg) =>
                isMobile ? renderMobileEvent(arg) : renderDesktopEvent(arg)
              }
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                meridiem: false,
              }}
              headerToolbar={
                isMobile
                  ? {
                      left: "prev,today,next",
                      center: "title",
                      right: "timeGridDay,timeGridWeek",
                    }
                  : {
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }
              }
              eventClick={(info) => {
                const rect = info.el.getBoundingClientRect();

                setHoveredEvent({
                  ...info.event.extendedProps,
                  id: info.event.id,
                  start: info.event.start?.toISOString(),
                  end: info.event.end?.toISOString(),
                });

                setHoverPosition({
                  x: rect.right + 10,
                  y: rect.top,
                });
              }}
            />
          </div>
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
