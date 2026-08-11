import BackButton from "../../commons/BackButton";
import InputDate from "../../commons/InputDate";
import InputSelect from "../../commons/InputSelect";
import InputText from "../../commons/InputText";
// import Title from "../../commons/Title";
// import Header from "../Header";
import { Report } from "notiflix/build/notiflix-report-aio";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { createHorario, editHorario } from "../../services/horarios.service";
import InputTime from "../../commons/InputTime";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ButtonSubmit from "../../commons/ButtonSubmit";
import Header from "../Header";

const allSports = [
  "Básquet",
  "Voley Femenino",
  "Voley Masculino",
  "Cesto",
  "Gimnasia Rítmica",
  "No Federados",
  "Otras Actividades",
];

function Carga() {
  const { role, sport } = useUserStoreLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [eventData, setEventData] = useState({
    gimnasio: "",
    deporte: "",
    nombreentrenador: "",
    // quienCarga: "",
    tipoDeActividad: "",
    start: "",
    end: "",
    categoria: "",
    estado: "",
    repetir: "", // nuevo campo para el select
  });

  const editingEvent = location.state?.event;
  const isEditing = !!editingEvent;

  const safeISO = (value: any) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  };

  useEffect(() => {
    if (!editingEvent) return;

    const start = safeISO(editingEvent.start);
    const end = safeISO(editingEvent.end);

    if (!start || !end) return;

    setSelectedDate(start.split("T")[0]);
    setStartTime(start.slice(11, 16));
    setEndTime(end.slice(11, 16));

    setEventData({
      gimnasio: editingEvent.gimnasio ?? "",
      deporte: editingEvent.deporte ?? "",
      categoria: editingEvent.categoria ?? "",
      tipoDeActividad: editingEvent.tipoDeActividad ?? "",
      repetir: editingEvent.repetir ?? "No",
      estado: "",
      nombreentrenador: "",
      start,
      end,
    });
  }, [editingEvent]);

  useEffect(() => {
    if (!selectedDate) return;

    setEventData((prev) => ({
      ...prev,
      start: startTime ? `${selectedDate}T${startTime}:00` : "",
      end: endTime ? `${selectedDate}T${endTime}:00` : "",
    }));
  }, [selectedDate, startTime, endTime]);

  const sportOptions = role === "entrenador" && sport ? [sport] : allSports;

  useEffect(() => {
    if (role === "entrenador" && sport) {
      setEventData((prev) => ({
        ...prev,
        deporte: sport,
      }));
    }
  }, [role, sport]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleDateChange = (name: string) => (date: string) => {
  //   setEventData((prevEventData) => ({
  //     ...prevEventData,
  //     [name]: date,
  //   }));
  // };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validaciones básicas
    if (
      !eventData.gimnasio ||
      !eventData.deporte ||
      !eventData.categoria ||
      !eventData.start ||
      !eventData.end ||
      !eventData.tipoDeActividad
    ) {
      setIsLoading(false);

      Report.failure("Error", "Debe completar todos los campos", "Volver");

      return;
    }

    if (eventData.start >= eventData.end) {
      setIsLoading(false);

      Report.failure(
        "Error",
        "El horario de inicio debe ser anterior al horario de fin.",
        "Volver",
      );

      return;
    }

    try {
      const horarioData = {
        gimnasio: eventData.gimnasio,
        deporte: eventData.deporte,
        categoria: eventData.categoria,
        start: eventData.start,
        end: eventData.end,
        tipoDeActividad: eventData.tipoDeActividad,
        recurrence: eventData.repetir === "Sí",
      };

      let res;

      if (isEditing) {
        res = await editHorario(editingEvent.id, {
          ...horarioData,
          editMode: "series",
        });
      } else {
        res = await createHorario(horarioData);
      }

      if (res) {
        setIsLoading(false);

        Report.success(
          isEditing ? "Actividad editada" : "Actividad cargada",
          isEditing
            ? "La actividad se modificó correctamente"
            : "Se cargó una nueva actividad correctamente",
          "Ok",
          () => {
            setEventData({
              gimnasio: "",
              deporte: "",
              nombreentrenador: "",
              tipoDeActividad: "",
              start: "",
              end: "",
              categoria: "",
              estado: "",
              repetir: "No",
            });

            setSelectedDate("");
            setStartTime("");
            setEndTime("");

            navigate("/calendario");
          },
        );
      }
    } catch (error: any) {
      setIsLoading(false);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "No se pudo guardar la actividad correctamente";

      Report.failure(
        isEditing
          ? "Error al editar la actividad"
          : "Error al cargar la actividad",
        message,
        "Volver",
      );

      console.error(error);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  if (role !== "admin" && role !== "entrenador") {
    return (
      <div className="xl:mt-[10%] mt-[15%] flex relative flex-col bg-[#fff] bg-opacity-90 z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center gap-10 py-8 m-auto rounded-3xl">
        <div
          data-aos="fade"
          data-aos-duration="2500"
          data-aos-delay="400"
          className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[60%] w-[90%] px-5 items-center gap-10 py-8 m-auto rounded-3xl"
        >
          <div
            className="flex mr-auto"
            data-aos="fade"
            data-aos-duration="2000"
            data-aos-delay="400"
          >
            <BackButton />
          </div>
          <p className="text-black xl:text-2xl md:text-2xl text-xl xl:text-start md:text-start text-center">
            Lo siento, debes pertenecer al departamento físico para cargar una
            nueva actividad
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-0 w-full items-center justify-center px-4 pt-28 pb-6">
        <div className="w-full max-w-5xl rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 p-10">
          {/* Back */}
          <div className="mb-8">
            <BackButton />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-800">
              {isEditing ? "Editar actividad" : "Nueva actividad"}
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              {isEditing
                ? "Modificá la información de la actividad."
                : "Creá entrenamientos, partidos y nuevas actividades para mantener actualizado el calendario del club."}
            </p>
          </div>

          {/* ================= INFORMACIÓN ================= */}

          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                📍
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">Información</h2>

                <p className="text-sm text-slate-500">
                  Datos principales de la actividad.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InputSelect
                placeholder="Gimnasio"
                options={[
                  "Gimnasio 1",
                  "Gimnasio 2",
                  "Monza",
                  "Alix",
                  "Terracita",
                  "Subsuelo",
                  "Salón Social",
                ]}
                width="full"
                value={eventData.gimnasio}
                onChange={handleChange}
                name="gimnasio"
              />

              <InputSelect
                placeholder={
                  role === "entrenador" ? sport : "Seleccionar actividad"
                }
                width="full"
                options={sportOptions}
                value={eventData.deporte}
                onChange={handleChange}
                name="deporte"
                disabled={role === "entrenador"}
              />

              <InputText
                placeholder="Categoría / Actividad"
                name="categoria"
                value={eventData.categoria}
                onChange={handleChange}
                width="full"
              />

              <InputSelect
                placeholder="Tipo de actividad"
                width="full"
                options={["Entrenamiento", "Partido", "Partidos inferiores"]}
                value={eventData.tipoDeActividad}
                onChange={handleChange}
                name="tipoDeActividad"
              />
            </div>
          </div>

          {/* ================= FECHA ================= */}

          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                🕒
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Fecha y horario
                </h2>

                <p className="text-sm text-slate-500">
                  Indicá cuándo se realizará la actividad.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InputDate
                placeholder="Fecha"
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
              />

              <InputSelect
                placeholder="Repetir"
                width="full"
                options={["Sí", "No"]}
                value={eventData.repetir}
                onChange={handleChange}
                name="repetir"
              />

              <InputTime
                placeholder="Hora Inicio"
                value={startTime}
                onChange={(time) => {
                  setStartTime(time);

                  setEventData((prev) => ({
                    ...prev,
                    start: selectedDate ? `${selectedDate}T${time}:00` : "",
                  }));
                }}
              />

              <InputTime
                placeholder="Hora Fin"
                value={endTime}
                onChange={(time) => {
                  setEndTime(time);

                  setEventData((prev) => ({
                    ...prev,
                    end: selectedDate ? `${selectedDate}T${time}:00` : "",
                  }));
                }}
              />
            </div>
          </div>

          {/* ================= BOTÓN ================= */}

          {isLoading ? (
            <div className="mt-12 flex flex-col items-center gap-4">
              <ClipLoader color="#157cbc" size={42} />
              <p className="font-medium text-slate-500">
                Guardando actividad...
              </p>
            </div>
          ) : (
            <div className="mt-12 flex justify-center">
              <ButtonSubmit
                text={isEditing ? "Guardar cambios" : "Crear actividad"}
                onClick={handleSubmit}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Carga;
