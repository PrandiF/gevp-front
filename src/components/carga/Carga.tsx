import BackButton from "../../commons/BackButton";
import InputDate from "../../commons/InputDate";
import InputSelect from "../../commons/InputSelect";
import InputText from "../../commons/InputText";
import Title from "../../commons/Title";
import Header from "../Header";
import { Report } from "notiflix/build/notiflix-report-aio";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { createHorario } from "../../services/horarios.service";
import Button4 from "../../commons/Button4";
import InputTime from "../../commons/InputTime";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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
      // !eventData.quienCarga ||
      !eventData.tipoDeActividad
    ) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el evento",
        "Debe completar todos los campos",
        "Volver",
      );
      return;
    }

    if (eventData.start >= eventData.end) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el entrenamiento",
        "El horario de inicio debe ser anterior al horario de fin.",
        "Volver",
      );
      return;
    }

    try {
      // Preparar datos para el back
      const horarioData = {
        gimnasio: eventData.gimnasio,
        deporte: eventData.deporte,
        categoria: eventData.categoria,
        start: eventData.start,
        end: eventData.end,
        // quienCarga: eventData.quienCarga,
        tipoDeActividad: eventData.tipoDeActividad,
        recurrence: eventData.repetir === "Sí",
      };

      const res = await createHorario(horarioData);

      if (res) {
        setIsLoading(false);
        Report.success(
          "Actividad Cargada",
          "Se cargó una nueva actividad correctamente",
          "Ok",
          () => {
            setEventData({
              gimnasio: "",
              deporte: "",
              nombreentrenador: "",
              // quienCarga: "",
              tipoDeActividad: "",
              start: "",
              end: "",
              categoria: "",
              estado: "",
              repetir: "No",
            });
            navigate("/calendario");
          },
        );
      }
    } catch (error: any) {
      setIsLoading(false);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "No se pudo cargar la actividad correctamente";

      Report.failure("Error al cargar la actividad", message, "Volver");

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
    <div className="relative flex w-full h-screen items-center z-20">
      <Header />
      <div className="flex w-full items-center flex-col gap-8 xl:pt-0 xl:pb-0 ">
        <div className="xl:mt-[8%] mt-[10%] flex relative flex-col bg-[#fff] bg-opacity-90 z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center gap-8 py-8 m-auto rounded-3xl">
          <div
            className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[70%] w-[90%] px-5 items-center gap-8 py-8 m-auto rounded-3xl xl:border-2 border border-gray-600"
            data-aos="fade"
            data-aos-duration="2500"
            data-aos-delay="400"
          >
            <div
              className="flex mr-auto"
              data-aos="fade"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <BackButton />
            </div>
            <Title text="Cargar Actividad" />
            <div className="flex flex-col xl:w-[70%] md:w-[70%] w-[50%] items-start justify-center xl:gap-6 md:gap-8 gap-3 mx-auto">
              <div className="flex w-full justify-center gap-8">
                <div className="flex w-full flex-col gap-6">
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
                  <InputDate
                    placeholder="Fecha"
                    width="full"
                    onChange={(date: string) => {
                      setSelectedDate(date.split("T")[0]);
                    }}
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

                  {/* <InputSelect
                    placeholder="Quien Carga"
                    width="full"
                    options={[
                      "Departamento Físico",
                      "Entrenador/a Basquet",
                      "Entrenador/a Cesto",
                      "Entrenador/a Voley",
                      "Entrenador/a Futbol",
                      "Entrenador/a Gimnasia Rítmica",
                    ]}
                    value={eventData.quienCarga}
                    onChange={handleChange}
                    name="quienCarga"
                  /> */}
                  <InputSelect
                    placeholder="Tipo de actividad"
                    width="full"
                    options={[
                      "Entrenamiento",
                      "Partido",
                      "Partidos inferiores",
                    ]}
                    value={eventData.tipoDeActividad}
                    onChange={handleChange}
                    name="tipoDeActividad"
                  />
                </div>
                <div className="flex w-full flex-col gap-6">
                  <InputSelect
                    placeholder={
                      role === "entrenador" ? sport : "Seleccionar actividad"
                    }
                    width="full"
                    options={sportOptions}
                    value={eventData.deporte}
                    onChange={handleChange}
                    name="deporte"
                    disabled={role === "entrenador"} // 🔒 bloqueado
                  />
                  <InputText
                    placeholder="Categoría/Actividad"
                    name="categoria"
                    value={eventData.categoria}
                    onChange={handleChange}
                    width="full"
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

                  {/* NUEVO CAMPO REPETIR */}
                  <InputSelect
                    placeholder="Repetir"
                    width="full"
                    options={["Sí", "No"]}
                    value={eventData.repetir}
                    onChange={handleChange}
                    name="repetir"
                  />
                </div>
              </div>
            </div>
            <button className="flex mx-auto" disabled={isLoading}>
              <Button4 text="Cargar" onClick={handleSubmit} />
            </button>
            {isLoading && (
              <div className="loading-spinner text-center">
                <ClipLoader color="#4D5061" loading={isLoading} size={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carga;
