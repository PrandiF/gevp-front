import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../commons/BackButton";
import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  deleteHorario,
  editHorario,
  getHorarioById,
} from "../../services/horarios.service";
import InputText from "../../commons/InputText";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import InputSelect from "../../commons/InputSelect";
import DeleteButton from "../../commons/DeleteButton";
import EditButton from "../../commons/EditButton";
import ConfirmButton from "../../commons/ConfirmButton";
import CancelButton from "../../commons/CancelButton";
import InputTime from "../../commons/InputTime";
import Title from "../../commons/Title";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { ClipLoader } from "react-spinners";

interface HorarioProps {
  gimnasio: string;
  deporte: string;
  dia: string;
  horarioInicio: string;
  horarioFin: string;
  categoria: string;
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

function HorarioIndividual() {
  const { role, hasHydrated } = useUserStoreLocalStorage();

  // Espera la hidratación antes de renderizar
  if (!hasHydrated) return null;

  // Inicializa AOS solo cuando hay datos de localStorage
  useEffect(() => {
    AOS.init();
  }, [hasHydrated]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [horarioData, setHorarioData] = useState<HorarioProps>({
    gimnasio: "",
    deporte: "",
    dia: "",
    horarioInicio: "",
    horarioFin: "",
    categoria: "",
    quienCarga: "",
  });

  const [originalHorarioData, setOriginalHorarioData] = useState<HorarioProps>({
    gimnasio: "",
    deporte: "",
    dia: "",
    horarioInicio: "",
    horarioFin: "",
    categoria: "",
    quienCarga: "",
  });

  const [editar, setEditar] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    AOS.init();
    if (id) {
      const horarioId = parseInt(id, 10);
      if (!isNaN(horarioId)) {
        getHorarioById(horarioId)
          .then((res) => {
            setHorarioData(res);
            setOriginalHorarioData(res);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
      }
    }
  }, [id]);

  const handleTimeChange = (name: string) => (time: string) => {
    setHorarioData((prevHorarioData) => ({
      ...prevHorarioData,
      [name]: time,
    }));
  };

  const handleConfirmDeleteHorario = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (id) {
      const horarioId = parseInt(id, 10);
      try {
        setIsLoading(false);
        const res = await deleteHorario(horarioId);
        if (res) {
          navigate("/entrenamientos");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error al eliminar la poliza:", error);
        throw error;
      }
    }
  };

  if (!id) {
    return <div>No existe el entrenamiento solicitada.</div>;
  }

  const handleConfirmEditHorario = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (id) {
      const horarioId = parseInt(id, 10);
      try {
        setIsLoading(false);
        await editHorario(horarioId, horarioData);
        setEditar(false);
        setHorarioData(horarioData);
        setOriginalHorarioData(horarioData);
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
    setHorarioData((prevHorarioData) => ({
      ...prevHorarioData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteHorario = async () => {
    Confirm.show(
      "Está a punto de eliminar el entrenamiento",
      "Desea confirmar?",
      "Si",
      "No",
      () => {
        handleConfirmDeleteHorario();
      },
    );
  };

  const handleEditHorario = async () => {
    Confirm.show(
      "Esta a punto de editar el entrenamiento",
      "Desea confirmar?",
      "Si",
      "No",

      () => {
        handleConfirmEditHorario();
      },
    );
  };

  const handleConfirmCancelEdit = () => {
    setHorarioData(originalHorarioData);
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
      <div className="flex w-full items-start flex-col gap-8 xl:pt-0 pt-[8%]">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[60%] w-[95%]  items-center gap-10 py-8 mx-auto xl:mt-[5%] xl:mb-[3%] mt-[10%]  rounded-3xl">
          <div
            className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 w-[90%] px-5 items-center gap-8 py-5 m-auto rounded-3xl xl:border-2 border border-gray-600"
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
            <Title text="Actividad Deportiva" />

            <div className="flex w-[50%] flex-col items-center justify-center xl:gap-6 md:gap-6 gap-4 mx-auto">
              <div className="flex w-full  justify-center gap-8">
                <div className="flex w-full flex-col xl:gap-6 md:gap-6 gap-8">
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Día
                    </label>
                    {!editar ? (
                      <InputText
                        name="dia"
                        value={horarioData.dia}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputSelect
                        placeholder="Día"
                        options={[
                          "Lunes",
                          "Martes",
                          "Miércoles",
                          "Jueves",
                          "Viernes",
                          "Sabado",
                        ]}
                        width="full"
                        value={horarioData.dia}
                        onChange={handleChange}
                        name="dia"
                      />
                    )}
                  </div>
                  <div className="flex w-full flex-col xl:gap-6 md:gap-6 gap-8">
                    <div className="flex flex-col">
                      <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                        Actividad
                      </label>
                      {!editar ? (
                        <InputText
                          name="deporte"
                          value={horarioData.deporte}
                          onChange={handleChange}
                          readonly={true}
                        />
                      ) : (
                        <InputSelect
                          placeholder="Actividad"
                          options={[
                            "Básquet Masculino",
                            "Básquet Femenino",
                            "Voley Masculino",
                            "Voley Femenino",
                            "Cesto",
                            "Tenis",
                            "Gimnasia Rítmica/Danza",
                            "Gimnasia Aeróbica",
                            "Gimnasia Suave",
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
                            "Yoga",
                            "Danza Jazz",
                            "Gimnasia",
                            "Jornada Extendida",
                            "Desarrollo Motor",
                            "Psicomotricidad",
                            "Pilates Mat",
                            "Tai Chi Chuan",
                            "Colonia Pami",
                            "Chi Kung",
                          ]}
                          width="full"
                          value={horarioData.deporte}
                          onChange={handleChange}
                          name="deporte"
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
                          value={`${horarioData.horarioInicio.slice(0, 5)}hs`}
                          onChange={handleChange}
                          readonly={true}
                        />
                      ) : (
                        <InputTime
                          value={`${horarioData.horarioInicio.slice(0, 5)}hs`}
                          onChange={handleTimeChange("horarioInicio")}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col xl:gap-6 md:gap-6 gap-8">
                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Espacio
                    </label>
                    {!editar ? (
                      <InputText
                        name="gimnasio"
                        value={horarioData.gimnasio.split("_").join(" ")}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputSelect
                        placeholder="Espacio"
                        options={[
                          "Gimnasio_1",
                          "Gimnasio_2",
                          "Monza",
                          "Alix",
                          "Terracita",
                          "Subsuelo",
                          "Salon Social",
                        ]}
                        width="full"
                        value={horarioData.gimnasio.split("_").join(" ")}
                        onChange={handleChange}
                        name="gimnasio"
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Categoría
                    </label>
                    {!editar ? (
                      <InputText
                        name="categoria"
                        value={horarioData.categoria}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputSelect
                        placeholder="Categoría"
                        options={[
                          "Primera Blanca",
                          "Primera Celeste",
                          "U21 Blanco",
                          "U21 Celeste",
                          "U17 Blanco",
                          "U17 Celeste",
                          "U15 Blanco",
                          "U15 Celeste",
                          "U13 Blanco",
                          "U13 Celeste",
                          "Mini Blanco",
                          "Mini Celeste",
                          "Premini Blanco",
                          "Premini Celeste",
                          "Mosquito",
                          "Escuelita",
                          "Tira Completa blanca",
                          "Tira Completa celeste",
                          "Técnica individual",
                          "Maxi 30",
                          "Sub 10",
                          "Sub 12",
                          "Sub 14",
                          "Sub 17",
                          "Sub 20",
                          "Primera A",
                          "Primera B",
                          "Sportclub",
                          "Elite",
                          "Equipo",
                          "Preequipo grande",
                          "Preequipo mini",
                          "Avanzada",
                          "Mekiterapia",
                          "3/6 años",
                          "4/5 años",
                          "6/7 años",
                          "7/10 años",
                          "7/13 años",
                          "8/11 años",
                          "11/16 años",
                          "12/15 años",
                          "Nivel D",
                          "Grupo 1",
                          "Grupo 2",
                          "Grupo 3",
                          "Arte",
                          "Jornada Extendida",
                          "TWD",
                          "Yoga",
                          "Danza Jazz",
                          "Gimnasia",
                          "Femenino",
                          "Tai Chi Chuan",
                          "Colonia Pami",
                          "Chi Kung",
                        ]}
                        width="full"
                        value={horarioData.categoria}
                        onChange={handleChange}
                        name="categoria"
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                      Horario Fin
                    </label>
                    {!editar ? (
                      <InputText
                        name="horarioFin"
                        value={`${horarioData.horarioFin.slice(0, 5)}hs`}
                        onChange={handleChange}
                        readonly={true}
                      />
                    ) : (
                      <InputTime
                        value={`${horarioData.horarioFin.slice(0, 5)}hs`}
                        onChange={handleTimeChange("horarioFin")}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full mx-auto items-center justify-center xl:mt-0 md:mt-0 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm text-start text-[#7c8087] font-semibold ml-1 mt-[-13px]">
                    Quien cargó
                  </label>
                  {!editar ? (
                    <InputText
                      name="quienCarga"
                      value={horarioData.quienCarga}
                      onChange={handleChange}
                      placeholder="Quien Cargó"
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
                      value={horarioData.quienCarga}
                      onChange={handleChange}
                      name="quienCarga"
                    />
                  )}
                </div>
              </div>
            </div>
            {role === "admin" && (
              <>
                {!editar ? (
                  <div className="flex gap-4 w-full items-center justify-center">
                    <EditButton
                      onClick={() => setEditar(true)}
                      text="Editar"
                      icon={true}
                    />
                    <DeleteButton onClick={handleDeleteHorario} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex gap-4 w-full items-center justify-center">
                      <ConfirmButton onClick={handleEditHorario} />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorarioIndividual;
