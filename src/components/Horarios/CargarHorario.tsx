import BackButton from "../../commons/BackButton";
import InputSelect from "../../commons/InputSelect";
import Title from "../../commons/Title";
import Header from "../Header";
import { Report } from "notiflix/build/notiflix-report-aio";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  createHorario,
  verificarHorarioDisponible,
} from "../../services/horarios.service";
import Button4 from "../../commons/Button4";
import InputTime from "../../commons/InputTime";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { ClipLoader } from "react-spinners";

function CargaHorario() {
  const role = useUserStoreLocalStorage((state) => state.role);
  const hasHydrated = useUserStoreLocalStorage((state) => state.hasHydrated);

  // Espera la hidratación antes de renderizar
  if (!hasHydrated) return null;

  // Inicializa AOS solo cuando hay datos de localStorage
  useEffect(() => {
    AOS.init();
  }, [hasHydrated]);
  console.log(role);
  const [isLoading, setIsLoading] = useState(false);
  const [horarioData, setHorarioData] = useState({
    gimnasio: "",
    deporte: "",
    dia: "",
    horarioInicio: "",
    horarioFin: "",
    categoria: "",
    quienCarga: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setHorarioData((prevHorarioData) => ({
      ...prevHorarioData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (
      !horarioData.gimnasio ||
      !horarioData.deporte ||
      !horarioData.dia ||
      !horarioData.categoria ||
      !horarioData.horarioInicio ||
      !horarioData.horarioFin ||
      !horarioData.quienCarga
    ) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el entrenamiento",
        "Debe completar todos los campos",
        "Volver",
      );
      return;
    }

    if (horarioData.horarioInicio >= horarioData.horarioFin) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el entrenamiento",
        "El horario de inicio debe ser anterior al horario de fin.",
        "Volver",
      );
      return;
    }

    try {
      const disponible = await verificarHorarioDisponible(
        horarioData.gimnasio,
        horarioData.dia,
        horarioData.horarioInicio,
        horarioData.horarioFin,
      );

      if (!disponible) {
        setIsLoading(false);
        Report.failure(
          "Error al cargar el entrenamiento",
          "El horario ya está ocupado.",
          "Volver",
        );
        return;
      }

      const res = await createHorario(horarioData);

      if (res) {
        setIsLoading(false);
        Report.success(
          "Entrenamiento Cargado",
          "Se cargó un nuevo entrenamiento correctamente",
          "Ok",
          () => {
            setHorarioData({
              gimnasio: "",
              deporte: "",
              categoria: "",
              dia: "",
              quienCarga: "",
              horarioInicio: "",
              horarioFin: "",
            });
            window.location.reload();
          },
        );
      } else {
        setIsLoading(false);
        Report.failure(
          "Error al cargar el entrenamiento",
          "No se pudo cargar el entrenamiento correctamente",
          "Volver",
          () => {
            setHorarioData({
              gimnasio: "",
              deporte: "",
              categoria: "",
              dia: "",
              quienCarga: "",
              horarioInicio: "",
              horarioFin: "",
            });
            window.location.reload();
          },
        );
      }
    } catch (error) {
      setIsLoading(false);
      Report.failure(
        "Error al cargar el entrenamiento",
        "No se pudo cargar el entrenamiento correctamente",
        "Volver",
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
      {role == "empleado" ? (
        <div className="flex w-full items-center justify-center flex-col gap-8 xl:pt-0 xl:pb-0 pt-[8%]">
          <div className="xl:mt-[8%] flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center  gap-8 py-8 m-auto rounded-3xl">
            <div
              className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[90%] w-[90%] px-5 items-center gap-8 py-8 m-auto rounded-3xl xl:border-2 border border-gray-600"
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
              <div className="w-full text-center">
                <Title text="Cargar entrenamiento" />
              </div>

              <div className="flex flex-col xl:w-[60%] md:w-[70%] w-full items-start justify-center xl:gap-6 md:gap-8 gap-3">
                <div className="flex w-full items-center justify-around xl:gap-5 gap-2">
                  <div className="flex w-full flex-col xl:gap-6 gap-3">
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
                    <InputSelect
                      placeholder="Actividad"
                      width="full"
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
                      value={horarioData.deporte}
                      onChange={handleChange}
                      name="deporte"
                    />
                    <InputTime
                      placeholder="Horario Inicio"
                      width="full"
                      onChange={(time) =>
                        setHorarioData((prevHorarioData) => ({
                          ...prevHorarioData,
                          horarioInicio: time,
                        }))
                      }
                      value={horarioData.horarioInicio}
                    />
                  </div>
                  <div className="flex w-full flex-col xl:gap-6 gap-3">
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
                      value={horarioData.gimnasio}
                      onChange={handleChange}
                      name="gimnasio"
                    />
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
                    <InputTime
                      placeholder="Horario Fin"
                      width="full"
                      onChange={(time) =>
                        setHorarioData((prevHorarioData) => ({
                          ...prevHorarioData,
                          horarioFin: time,
                        }))
                      }
                      value={horarioData.horarioFin}
                    />
                  </div>
                </div>
                <div className="flex w-[50%] mx-auto items-center justify-center">
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
      ) : role == "socio" ? (
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
              Lo siento, debes ser empleado del club para cargar un nuevo
              entrenamiento
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CargaHorario;
