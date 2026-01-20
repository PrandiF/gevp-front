import React, { useState } from "react";
import AddButton from "../../commons/AddButton";
import CancelSearchButton from "../../commons/CancelSearchButton";
import SearchButton from "../../commons/SearchButton";
import InputTime from "../../commons/InputTime";
import InputSelect from "../../commons/InputSelect";
import Title from "../../commons/Title";
import BackButton from "../../commons/BackButton";
import Header from "../Header";
import { useParams } from "react-router-dom";
import { useUserStoreLocalStorage } from "../../store/userStore";
import TablaHorarios2 from "./TablaHorarios2";
import { CiClock1 } from "react-icons/ci";

function HorarioDia() {
  const { role, hasHydrated } = useUserStoreLocalStorage();

  // Espera la hidratación antes de renderizar
  if (!hasHydrated) return null;

  // Inicializa AOS solo cuando hay datos de localStorage
  // useEffect(() => {
  //   AOS.init();
  // }, [hasHydrated]);
  const initialFilterData = {
    gimnasio: "",
    horarioInicio: "",
    horarioFin: "",
    dia: "",
    categoria: "",
    deporte: "",
  };

  const { dia, gimnasio } = useParams<{ dia: string; gimnasio: string }>();

  const [filterData, setFilterData] = useState(initialFilterData);
  const [isFilter, setIsFilter] = useState(false);
  const [isClean, setIsClean] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setIsClean(false);
    isFilter && setIsFilter(false);
    setFilterData((prevEventoData) => ({
      ...prevEventoData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    setIsFilter(true);
  };

  const handleCancel = () => {
    setFilterData(initialFilterData);
    setIsClean(true);
    setIsFilter(false);
  };

  return (
    <div className="relative flex w-full  items-start z-20 xl:py-0 xl:pt-[5%] md:py-0 md:pt-[5%] py-[8%]">
      <Header />
      <div className="flex w-full items-start flex-col gap-8 xl:pt-0  pt-[5%]">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[90%] w-[90%]  items-center gap-10 xl:py-8 py-3 mx-auto xl:mt-[5%] xl:mb-[3%] mt-[10%] mb-[1.5%]  rounded-3xl">
          <div className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%]  w-[95%] xl:px-5  items-center gap-10 xl:py-8 py-5 m-auto rounded-3xl xl:border-2 border border-gray-600">
            <div
              className="flex mr-auto xl:pl-0 pl-5"
              data-aos="fade"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <BackButton />
            </div>
            <div
              className="flex text-center"
              data-aos="fade"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <Title
                text={`${gimnasio?.split("_").join(" ")} - ${dia}` || ""}
              />
            </div>
            <div className="flex flex-col xl:flex-row xl:gap-5 gap-3 w-[80%] xl:w-auto">
              <div
                className="relative flex items-center gap-2 h-full w-full"
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
                <div className="text-lg text-gray-500">
                  <CiClock1 />
                </div>
                <InputTime
                  placeholder="Horario"
                  clean={isClean}
                  width="full"
                  onChange={(time) =>
                    setFilterData((prevFilterData) => ({
                      ...prevFilterData,
                      horarioInicio: time,
                    }))
                  }
                />
              </div>
              <div
                className="flex  items-center gap-5 h-full w-full "
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
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
                  value={filterData.deporte}
                  onChange={handleChange}
                  name="deporte"
                  clean={isClean}
                />
              </div>
              <div
                className="flex  items-center gap-5 h-full w-full "
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
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
                  value={filterData.categoria}
                  onChange={handleChange}
                  name="categoria"
                  clean={isClean}
                />
              </div>
              <div className="flex xl:flex-row md:flex-row flex-col xl:gap-4 md:gap-4 gap-2 justify-center items-center xl:w-full md:w-[50%] md:mx-auto">
                <button
                  onClick={isFilter ? handleCancel : handleSearch}
                  className="xl:w-fit w-full flex h-full justify-center items-center"
                  data-aos="fade"
                  data-aos-duration="2000"
                  data-aos-delay="600"
                >
                  {isFilter ? (
                    <div className=" text-white flex  items-center justify-center rounded-lg cursor-pointer hover:brightness-95 ">
                      <CancelSearchButton />
                    </div>
                  ) : (
                    <SearchButton />
                  )}
                </button>
                {role == "empleado" && (
                  <div
                    className="xl:w-fit w-full flex h-full justify-center items-center"
                    data-aos="fade"
                    data-aos-duration="2000"
                    data-aos-delay="600"
                  >
                    <AddButton
                      text="Nueva Actividad"
                      url="/entrenamientos/cargar"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center px-4 justify-center w-full rounded-lg mb-3">
              <TablaHorarios2 filter={filterData} isFilter={isFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorarioDia;
