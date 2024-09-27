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

function CargaHorario() {
  const { role } = useUserStoreLocalStorage();
  console.log(role);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setHorarioData((prevHorarioData) => ({
      ...prevHorarioData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !horarioData.gimnasio ||
      !horarioData.deporte ||
      !horarioData.dia ||
      !horarioData.categoria ||
      !horarioData.horarioInicio ||
      !horarioData.horarioFin ||
      !horarioData.quienCarga
    ) {
      Report.failure(
        "Error al cargar el entrenamiento",
        "Debe completar todos los campos",
        "Volver"
      );
      return;
    }

    if (horarioData.horarioInicio >= horarioData.horarioFin) {
      Report.failure(
        "Error al cargar el entrenamiento",
        "El horario de inicio debe ser anterior al horario de fin.",
        "Volver"
      );
      return;
    }

    try {
      const disponible = await verificarHorarioDisponible(
        horarioData.gimnasio,
        horarioData.dia,
        horarioData.horarioInicio,
        horarioData.horarioFin
      );

      if (!disponible) {
        Report.failure(
          "Error al cargar el entrenamiento",
          "El horario ya está ocupado.",
          "Volver"
        );
        return;
      }

      const res = await createHorario(horarioData);

      if (res) {
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
          }
        );
      } else {
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
          }
        );
      }
    } catch (error) {
      Report.failure(
        "Error al cargar el entrenamiento",
        "No se pudo cargar el entrenamiento correctamente",
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
        <div className="flex w-full items-center justify-center flex-col gap-8 xl:pt-0 xl:pb-0 pt-[8%]">
          <div className="xl:mt-[5%] flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[65%] md:w-[65%] w-[90%] items-center  gap-10 py-8 m-auto rounded-3xl">
            <div
              className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[90%] w-[90%] px-5 items-center gap-10 py-8 m-auto rounded-3xl xl:border-2 border border-gray-600"
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

              <div className="flex flex-col xl:w-[60%] md:w-[70%] w-full items-start justify-center xl:gap-8 md:gap-8 gap-3">
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
                      placeholder="Gimnasio"
                      options={[
                        "Gimnasio_1",
                        "Gimnasio_2",
                        "Monza",
                        "Alix",
                        "Terracita",
                      ]}
                      width="full"
                      value={horarioData.gimnasio}
                      onChange={handleChange}
                      name="gimnasio"
                    />
                    <InputSelect
                      placeholder="Categoría"
                      options={[
                        "Primera A",
                        "Primera B",
                        "U21 A",
                        "U21 B",
                        "U17 A",
                        "U17 B",
                        "U15 A",
                        "U15 B",
                        "U13 A",
                        "U13 B",
                        "Mini A",
                        "Mini B",
                        "Premini A",
                        "Premini B",
                        "Mosquito",
                        "Escuelita",
                        "Técnica individual",
                        "Femenino",
                        "Veteranos +54",
                        "Veteranos +48",
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
                        "Franco Prandi",
                        "Fernando Prandi",
                        "Leonardo Assandri",
                      ]}
                      value={horarioData.quienCarga}
                      onChange={handleChange}
                      name="quienCarga"
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
              Lo siento, debes ser administrador para cargar un nuevo
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
