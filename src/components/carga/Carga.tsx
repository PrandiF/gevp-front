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

function Carga() {
  const [eventData, setEventData] = useState({
    gimnasio: "",
    deporte: "",
    nombreSocio: "",
    fecha: "",
    horarioInicio: "",
    horarioFin: "",
    evento: "",
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
    try {
      const isAvailable = await verificarHorarioDisponible(
        eventData.gimnasio,
        eventData.fecha, // Asegúrate de que la fecha esté en el formato correcto
        eventData.horarioInicio,
        eventData.horarioFin
      );
  
      if (isAvailable) {
        const res = await createEvento(eventData);
  
        if (res) {
          Report.success(
            "Evento Cargado",
            "Se cargó un nuevo evento correctamente",
            "Ok",
            () => {
              setEventData({
                gimnasio: "",
                deporte: "",
                nombreSocio: "",
                fecha: "",
                horarioInicio: "",
                horarioFin: "",
                evento: "",
              });
              window.location.reload();
            }
          );
        }
      } else {
        Report.failure(
          "Horario No Disponible",
          "El horario seleccionado ya está ocupado.",
          "Volver",
          () => {
            setEventData({
              gimnasio: "",
              deporte: "",
              nombreSocio: "",
              fecha: "",
              horarioInicio: "",
              horarioFin: "",
              evento: "",
            });
            window.location.reload();
          }
        );
      }
    } catch (error) {
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
    <div className="relative flex flex-col w-full h-screen items-start z-20">
      <Header />
      <div className="flex w-full items-center flex-col gap-8 xl:pt-0 xl:pb-0 ">
        <div className="xl:mt-[5%] flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center gap-10 py-8 m-auto rounded-3xl">
          <div
            className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[60%] w-[90%] px-5 items-center gap-10 py-8 m-auto rounded-3xl"
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
            <Title text="Cargar pólizas" />
            <div className="flex flex-col xl:w-[70%] w-[50%] items-start justify-center xl:gap-8 md:gap-8 gap-3 mx-auto">
              <div className="flex w-full  justify-center gap-8">
                <div className="flex w-full flex-col gap-6">
                  <InputSelect
                    placeholder="Gimnasio"
                    options={[
                      "Gimnasio 1",
                      "Gimnasio 2",
                      "Monza",
                      "Alix",
                      "Terracita",
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
                </div>
                <div className="flex w-full flex-col gap-6">
                  <InputSelect
                    placeholder="Deporte"
                    width="full"
                    options={[
                      "Básquet",
                      "Voley",
                      "Cesto",
                      "Tenis",
                      "Gimnasia Rítmica",
                      "Fútbol",
                      "Zumba",
                    ]}
                    value={eventData.deporte}
                    onChange={handleChange}
                    name="deporte"
                  />
                  <InputText
                    placeholder="Nombre Socio"
                    value={eventData.nombreSocio}
                    onChange={handleChange}
                    name="nombreSocio"
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
                </div>
              </div>

              <div className="flex xl:w-[50%] mx-auto items-center justify-center">
                <InputText
                  placeholder="Evento"
                  name="evento"
                  value={eventData.evento}
                  onChange={handleChange}
                  width="full"
                />
              </div>
            </div>
            <div
              data-aos="fade"
              data-aos-duration="2000"
              data-aos-delay="600"
              className="flex mx-auto"
            >
              <Button4 text="Cargar" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carga;
