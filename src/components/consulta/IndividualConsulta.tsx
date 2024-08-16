import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../commons/BackButton";
import Button1 from "../../commons/EditButton";
import Button2 from "../../commons/DeleteButton";
import Button3 from "../../commons/ConfirmButton";
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
import Button4 from "../../commons/Button4";
import DeleteButton from "../../commons/DeleteButton";
import EditButton from "../../commons/EditButton";
import ConfirmButton from "../../commons/ConfirmButton";
import CancelButton from "../../commons/CancelButton";
import InputTime from "../../commons/InputTime";

interface EventProps {
  gimnasio: string;
  deporte: string;
  fecha: string;
  horarioInicio: string;
  horarioFin: string;
  nombreSocio: string;
  evento: string;
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

  const formatDate = (date: string): string => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const navigate = useNavigate();
  const [eventData, setEventData] = useState<EventProps>({
    gimnasio: "",
    deporte: "",
    fecha: "",
    horarioInicio: "",
    horarioFin: "",
    nombreSocio: "",
    evento: "",
  });

  const [originalEventData, setOriginalEventData] = useState<EventProps>({
    gimnasio: "",
    deporte: "",
    fecha: "",
    horarioInicio: "",
    horarioFin: "",
    nombreSocio: "",
    evento: "",
  });
  const [error, setError] = useState("");
  const [editar, setEditar] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    AOS.init();
    if (id) {
      const eventId = parseInt(id, 10); // Convierte id a un número
      if (!isNaN(eventId)) {
        getEventoById(eventId)
          .then((res) => {
            setEventData(res);
            setOriginalEventData(res);
          })
          .catch((error) => {
            console.error(error);
            setError(
              "Evento no encontrado. Verifica el ID e intenta nuevamente."
            );
          });
      } else {
        setError("ID del evento inválido.");
      }
    }
  }, [id]);

  const handleDateChange = (name: string) => (date: string) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: date,
    }));
  };

  const handleConfirmDeleteEvent = async () => {
    if (id) {
      const eventId = parseInt(id, 10);
      try {
        const res = await deleteEvento(eventId);
        if (res) {
          navigate("/consultar");
        }
      } catch (error) {
        console.error("Error al eliminar la poliza:", error);
        throw error;
      }
    }
  };

  // if (!polizaNumber) {
  //   return <div>No existe la póliza solicitada.</div>;
  // }

  const handleConfirmEditEvent = async () => {
    if (id) {
      const eventId = parseInt(id, 10);
      try {
        await editEvento(eventId, eventData);
        setEditar(false);
        setEventData(eventData);
        setOriginalEventData(eventData);
      } catch (error) {
        setEditar(false);
        throw error;
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      }
    );
  };

  const handleEditPoliza = async () => {
    Confirm.show(
      "Esta a punto de editar la póliza",
      "Desea confirmar?",
      "Si",
      "No",

      () => {
        handleConfirmEditEvent();
      }
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
      }
    );
  };

  return (
    <div className="relative flex flex-col w-full h-screen items-center z-20 ">
      <Header />
      <div className="flex w-full items-start flex-col gap-8">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[60%] w-[95%]  items-center gap-10 py-8 mx-auto  rounded-3xl">
          <div
            className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 w-[90%] px-5 items-center gap-16 py-5 m-auto rounded-3xl"
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

            <div className="flex w-[50%] flex-col items-center justify-center xl:gap-8 md:gap-6 gap-4 mx-auto">
              <div className="flex w-full  justify-center gap-8">
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
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Fecha
                    </label>
                    {!editar ? (
                      <InputText
                        name="fecha"
                        value={formatDate(eventData.fecha.slice(0, 10))}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputDate
                        value={formatDate(eventData.fecha.slice(0, 10))}
                        onChange={handleDateChange}
                        width="full"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
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
                      />
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Deporte
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
                        placeholder="Deporte"
                        options={[
                          "Básquet",
                          "Voley",
                          "Cesto",
                          "Tenis",
                          "Gimnasia Rítmica",
                          "Fútbol",
                          "Zumba",
                        ]}
                        width="full"
                        value={eventData.deporte}
                        onChange={handleChange}
                        name="deporte"
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
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

                  <div className="flex flex-col">
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
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex w-full mx-auto items-center justify-center">
                <div className="flex flex-col">
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
              </div>
            </div>
            {!editar ? (
              <div className="flex gap-4 w-full items-center justify-center">
                <EditButton onClick={() => setEditar(true)} />
                <DeleteButton onClick={handleDeleteEvent} />
              </div>
            ) : (
              <div className="flex gap-4 w-full items-center justify-center">
                <ConfirmButton onClick={handleEditPoliza} />
                <CancelButton onClick={handleCancelEdit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualConsulta;
