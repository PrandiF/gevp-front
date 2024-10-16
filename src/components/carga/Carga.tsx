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
import {
  createEvento,
  verificarHorarioDisponible,
} from "../../services/evento.service";
import Button4 from "../../commons/Button4";
import InputTime from "../../commons/InputTime";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { ClipLoader } from "react-spinners";

function Carga() {
  const { role } = useUserStoreLocalStorage();

  console.log("Role in component:", role);
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState({
    gimnasio: "",
    deporte: "",
    nombreSocio: "",
    fecha: new Date(),
    quienCarga: "",
    horarioInicio: "",
    horarioFin: "",
    evento: "",
    estado: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (name: string) => (date: string) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: date,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (
      !eventData.gimnasio ||
      !eventData.deporte ||
      !eventData.fecha ||
      !eventData.nombreSocio ||
      !eventData.evento ||
      !eventData.horarioInicio ||
      !eventData.horarioFin ||
      !eventData.quienCarga
    ) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el evento",
        "Debe completar todos los campos",
        "Volver"
      );
      return;
    }

    if (eventData.horarioInicio >= eventData.horarioFin) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el evento",
        "El horario de inicio debe ser anterior al horario de fin.",
        "Volver"
      );
      return;
    }

    try {
      const disponible = await verificarHorarioDisponible(
        eventData.gimnasio,
        eventData.fecha,
        eventData.horarioInicio,
        eventData.horarioFin
      );

      if (!disponible) {
        setIsLoading(false);
        Report.failure(
          "Error al cargar el evento",
          "El horario ya está ocupado.",
          "Volver"
        );
        return;
      }

      const res = await createEvento(eventData);

      if (res) {
        setIsLoading(false);
        Report.success(
          "Evento Cargado",
          "Se cargó un nuevo evento correctamente",
          "Ok",
          () => {
            setEventData({
              gimnasio: "",
              deporte: "",
              nombreSocio: "",
              fecha: new Date(),
              quienCarga: "",
              horarioInicio: "",
              horarioFin: "",
              evento: "",
              estado: "",
            });
            window.location.reload();
          }
        );
      } else {
        setIsLoading(false);
        Report.failure(
          "Error al cargar el evento",
          "No se pudo cargar el evento correctamente",
          "Volver",
          () => {
            setEventData({
              gimnasio: "",
              deporte: "",
              nombreSocio: "",
              fecha: new Date(),
              quienCarga: "",
              horarioInicio: "",
              horarioFin: "",
              evento: "",
              estado: "",
            });
            window.location.reload();
          }
        );
      }
    } catch (error) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el evento",
        "No se pudo cargar el evento correctamente",
        "Volver"
      );
      throw error;
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative flex w-full h-screen items-center z-20">
      <Header />
      {role == "admin" ? (
        <div className="flex w-full items-center flex-col gap-8 xl:pt-0 xl:pb-0 ">
          <div className="xl:mt-[8%] flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center gap-8 py-8 m-auto rounded-3xl">
            <div
              className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[60%] w-[90%] px-5 items-center gap-8 py-8 m-auto rounded-3xl xl:border-2 border border-gray-600"
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
              <Title text="Cargar Evento" />
              <div className="flex flex-col xl:w-[70%] w-[50%] items-start justify-center xl:gap-6 md:gap-8 gap-3 mx-auto">
                <div className="flex w-full  justify-center gap-8">
                  <div className="flex w-full flex-col gap-6">
                    <InputSelect
                      placeholder="Espacio"
                      options={[
                        "Gimnasio 1",
                        "Gimnasio 2",
                        "Monza",
                        "Alix",
                        "Terracita",
                        "Subsuelo",
                        "Salon Social",
                      ]}
                      width="full"
                      value={eventData.gimnasio}
                      onChange={handleChange}
                      name="gimnasio"
                    />
                    <InputDate
                      placeholder="Fecha"
                      width="full"
                      onChange={handleDateChange("fecha")}
                    />
                    <InputTime
                      placeholder="Horario Inicio"
                      width="full"
                      onChange={(time) =>
                        setEventData((prevEventData) => ({
                          ...prevEventData,
                          horarioInicio: time,
                        }))
                      }
                      value={eventData.horarioInicio}
                    />
                    <InputText
                      placeholder="Nombre Socio"
                      value={eventData.nombreSocio}
                      onChange={handleChange}
                      name="nombreSocio"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-6">
                    <InputSelect
                      placeholder="Actividad"
                      width="full"
                      options={[
                        "Básquet",
                        "Voley",
                        "Cesto",
                        "Tenis",
                        "Gimnasia Rítmica",
                        "Fútbol",
                        "Zumba",
                        "Comisión Directiva",
                        "Funcional SportClub",
                        "Mekitarista",
                        "Patín",
                        "Taller de arte",
                        "Stretching",
                        "Esc. Artistica",
                        "Iniciación deportiva",
                        "Folklore",
                        "TWD",
                      ]}
                      value={eventData.deporte}
                      onChange={handleChange}
                      name="deporte"
                    />
                    <InputText
                      placeholder="Evento"
                      name="evento"
                      value={eventData.evento}
                      onChange={handleChange}
                      width="full"
                    />
                    <InputTime
                      placeholder="Horario Fin"
                      width="full"
                      onChange={(time) =>
                        setEventData((prevEventData) => ({
                          ...prevEventData,
                          horarioFin: time,
                        }))
                      }
                      value={eventData.horarioFin}
                    />
                    <InputSelect
                      placeholder="Quien Carga"
                      width="full"
                      options={[
                        "Claudio Arnossi",
                        "Julieta Proserpio",
                        "Gustavo Alfaro",
                      ]}
                      value={eventData.quienCarga}
                      onChange={handleChange}
                      name="quienCarga"
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
      ) : role == "employee" ? (
        <div className="xl:mt-[10%] flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center gap-10 py-8 m-auto rounded-3xl">
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
              Lo siento, debes ser administrador para cargar un nuevo evento
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Carga;
