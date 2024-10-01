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

function HorarioDia() {
  const { role } = useUserStoreLocalStorage();
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    setIsFilter(false);
    setIsClean(true);
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
                className="relative flex items-center gap-5 h-full w-full"
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
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
                    "Básquet",
                    "Voley",
                    "Cesto",
                    "Tenis",
                    "Gimnasia Rítmica",
                    "Fútbol",
                    "Zumba",
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
                {role == "admin" ? (
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
                ) : (
                  ""
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
