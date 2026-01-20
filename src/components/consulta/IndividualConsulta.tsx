import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../commons/BackButton";
import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  deleteEvento,
  editEvento,
  getEventoById,
} from "../../services/evento.service";
import InputText from "../../commons/InputText";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import InputSelect from "../../commons/InputSelect";
import InputDate from "../../commons/InputDate";
import DeleteButton from "../../commons/DeleteButton";
import EditButton from "../../commons/EditButton";
import ConfirmButton from "../../commons/ConfirmButton";
import CancelButton from "../../commons/CancelButton";
import InputTime from "../../commons/InputTime";
import { useUserStoreLocalStorage } from "../../store/userStore";
import Title from "../../commons/Title";
import { ClipLoader } from "react-spinners";

interface EventProps {
  gimnasio: string;
  deporte: string;
  fecha: Date;
  horarioInicio: string;
  horarioFin: string;
  nombreSocio: string;
  evento: string;
  quienCarga: string;
}

Confirm.init({
  className: "notiflix-confirm",
  width: "350px",
  titleColor: "#000000",
  titleFontSize: "20px",
  messageColor: "#2c3e50",
  messageFontSize: "18px",
  buttonsFontSize: "16px",
  okButtonBackground: "#3bcb77",
  okButtonColor: "#ffffff",
  cancelButtonBackground: "#ea6b5c",
  cancelButtonColor: "#ffffff",
});

function IndividualConsulta() {
  const [isEnded, setIsEnded] = useState(false);
  const { role } = useUserStoreLocalStorage();

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }

    const day = String(dateObj.getDate() + 1).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<EventProps>({
    gimnasio: "",
    deporte: "",
    fecha: new Date(),
    horarioInicio: "",
    horarioFin: "",
    nombreSocio: "",
    evento: "",
    quienCarga: "",
  });

  const [originalEventData, setOriginalEventData] = useState<EventProps>({
    gimnasio: "",
    deporte: "",
    fecha: new Date(),
    horarioInicio: "",
    horarioFin: "",
    nombreSocio: "",
    evento: "",
    quienCarga: "",
  });

  const [editar, setEditar] = useState(false);

  const { id } = useParams();

  const checkIfEventFinished = () => {
    const currentDateTime = new Date();
    const eventEndDateTime = new Date(eventData.fecha);
    const [hours, minutes] = eventData.horarioFin.split(":").map(Number);
    eventEndDateTime.setHours(hours, minutes, 0);

    if (currentDateTime > eventEndDateTime) {
      setIsEnded(true);
    } else {
      setIsEnded(false);
    }
  };

  useEffect(() => {
    AOS.init();
    if (id) {
      const eventId = parseInt(id, 10);
      if (!isNaN(eventId)) {
        getEventoById(eventId)
          .then((res) => {
            setEventData(res);
            setOriginalEventData(res);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
      }
    }
  }, [id]);

  useEffect(() => {
    if (eventData.fecha && eventData.horarioFin) {
      checkIfEventFinished();
    }
  }, [eventData]);

  const handleDateChange = (name: string) => (date: string) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: date,
    }));
  };

  const handleTimeChange = (name: string) => (time: string) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: time,
    }));
  };

  const handleConfirmDeleteEvent = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (id) {
      const eventId = parseInt(id, 10);
      try {
        setIsLoading(false);
        const res = await deleteEvento(eventId);
        if (res) {
          navigate("/eventos");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error al eliminar la poliza:", error);
        throw error;
      }
    }
  };

  if (!id) {
    return <div>No existe la póliza solicitada.</div>;
  }

  const handleConfirmEditEvent = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (id) {
      const eventId = parseInt(id, 10);
      try {
        setIsLoading(false);
        await editEvento(eventId, eventData);
        setEditar(false);
        setEventData(eventData);
        setOriginalEventData(eventData);
      } catch (error) {
        setIsLoading(false);
        setEditar(false);
        throw error;
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteEvent = async () => {
    Confirm.show(
      "Está a punto de eliminar el evento",
      "Desea confirmar?",
      "Si",
      "No",
      () => {
        handleConfirmDeleteEvent();
      },
    );
  };

  const handleEditEvent = async () => {
    Confirm.show(
      "Esta a punto de editar la póliza",
      "Desea confirmar?",
      "Si",
      "No",

      () => {
        handleConfirmEditEvent();
      },
    );
  };

  const handleConfirmCancelEdit = () => {
    setEventData(originalEventData);
    setEditar(false);
  };

  const handleCancelEdit = () => {
    Confirm.show(
      "Cancelar edición",
      "Desea confirmar?",
      "Si",
      "No",

      () => {
        handleConfirmCancelEdit();
      },
    );
  };

  return (
    <div className="relative flex w-full items-center z-20 xl:py-0 xl:pt-[5%] md:py-0 md:pt-[5%] py-[8%]">
      <Header />
      <div className="flex w-full items-start flex-col gap-8 xl:pt-0  pt-[5%]">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[60%] w-[95%]  items-center gap-10 py-8 mx-auto xl:mt-[5%] xl:mb-[3%] mt-[10%]  rounded-3xl">
          <div
            className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 w-[90%] px-5 items-center gap-10 py-5 m-auto rounded-3xl xl:border-2 border border-gray-600"
            data-aos="fade"
            data-aos-duration="2600"
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
            <Title text="Evento" />

            <div className="flex w-[50%] flex-col items-center justify-center xl:gap-8 md:gap-6 gap-4 mx-auto">
              <div className="flex w-full justify-center items-center gap-2">
                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Gminasio
                    </label>
                    {!editar ? (
                      <InputText
                        name="gimnasio"
                        value={eventData.gimnasio}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
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
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Fecha
                    </label>
                    {!editar ? (
                      <InputText
                        name="fecha"
                        value={formatDate(eventData.fecha)}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputDate
                        value={formatDate(eventData.fecha)}
                        onChange={handleDateChange("fecha")}
                        width="full"
                      />
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Horario Inicio
                    </label>
                    {!editar ? (
                      <InputText
                        name="horarioInicio"
                        value={`${eventData.horarioInicio.slice(0, 5)}hs`}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputTime
                        value={`${eventData.horarioInicio.slice(0, 5)}hs`}
                        onChange={handleTimeChange("horarioInicio")}
                      />
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Nombre Socio
                    </label>
                    <InputText
                      name="nombreSocio"
                      value={eventData.nombreSocio}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Actividad
                    </label>
                    {!editar ? (
                      <InputText
                        name="deporte"
                        value={eventData.deporte}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputSelect
                        placeholder="Actividad"
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
                        width="full"
                        value={eventData.deporte}
                        onChange={handleChange}
                        name="deporte"
                      />
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Evento
                    </label>

                    <InputText
                      name="evento"
                      value={eventData.evento}
                      onChange={handleChange}
                      readonly={!editar}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Horario Fin
                    </label>
                    {!editar ? (
                      <InputText
                        name="horarioFin"
                        value={`${eventData.horarioFin.slice(0, 5)}hs`}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputTime
                        value={`${eventData.horarioFin.slice(0, 5)}hs`}
                        onChange={handleTimeChange("horarioFin")}
                      />
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Quien Cargó
                    </label>
                    {!editar ? (
                      <InputText
                        name="quienCarga"
                        value={eventData.quienCarga}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
            {role === "admin" && !isEnded ? (
              <>
                {!editar ? (
                  <div className="flex gap-4 w-full items-center justify-center">
                    <EditButton
                      onClick={() => setEditar(true)}
                      text="Editar"
                      icon={true}
                    />
                    <DeleteButton onClick={handleDeleteEvent} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex gap-4 w-full items-center justify-center">
                      <ConfirmButton onClick={handleEditEvent} />
                      <CancelButton onClick={handleCancelEdit} />
                    </div>
                    {isLoading && (
                      <div className="loading-spinner">
                        <ClipLoader
                          color="#4D5061"
                          loading={isLoading}
                          size={50}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : role == "admin" && isEnded ? (
              <div className="flex w-full items-start justify-center">
                <p className="text-red-600 text-lg  font-semibold">
                  Evento Finalizdo
                </p>
              </div>
            ) : role == "socio" && isEnded ? (
              <div className="flex w-full items-start justify-center">
                <p className="text-red-600 text-lg font-semibold">
                  Evento Finalizdo
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualConsulta;
