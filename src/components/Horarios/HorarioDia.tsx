import React, { useState } from "react";
import AddButton from "../../commons/AddButton";
import CancelSearchButton from "../../commons/CancelSearchButton";
import SearchButton from "../../commons/SearchButton";
import InputTime from "../../commons/InputTime";
import InputSelect from "../../commons/InputSelect";
import Title from "../../commons/Title";
import BackButton from "../../commons/BackButton";
import Header from "../Header";
import TablaHorarios from "./TablaHorarios";
import { useParams } from "react-router-dom";
import PaginationHorarios from "./PaginationHorarios";

function HorarioDia() {
  const initialFilterData = {
    gimnasio: "",
    horarioInicio: "",
    horarioFin: "",
    dia: "",
    categoria: "",
    deporte: "",
  };

  const { dia } = useParams<{ dia: string }>();

  const [filterData, setFilterData] = useState(initialFilterData);
  const [isFilter, setIsFilter] = useState(false);
  const [pageTotal, setPageTotal] = useState(1);
  const [pageFilter, setPageFilter] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    setPageTotal(1);
  };

  const functionSetPageTotal = (num: number) => {
    setPageTotal(num);
  };

  const functionSetPageFilter = (num: number) => {
    setPageFilter(num);
  };
  return (
    <div className="relative flex w-full h-screen items-start z-20 pt-[8%]">
      <Header />
      <div className="flex w-full items-start flex-col gap-8">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[90%] w-[80%]  items-center gap-10 xl:py-8 py-3 mx-auto xl:mt-[4%] mt-[10%]  rounded-3xl">
          <div className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%]  w-[95%] xl:px-5  items-center gap-10 xl:py-8 py-5 m-auto rounded-3xl">
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
              <Title text={dia || ""} />
            </div>
            <div className="flex flex-col xl:flex-row xl:gap-5 gap-3 w-[80%] xl:w-auto">
              <div
                className="flex  items-center gap-5 h-full w-full "
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
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
                  value={filterData.gimnasio}
                  onChange={handleChange}
                  name="gimnasio"
                  clean={!isFilter}
                />
              </div>

              <div
                className="relative flex items-center gap-5 h-full w-full"
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
                <InputTime
                  placeholder="Horario"
                  clean={!isFilter}
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
                  value={filterData.deporte}
                  onChange={handleChange}
                  name="deporte"
                  clean={!isFilter}
                />
              </div>
              {/* <div
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
                  clean={!isFilter}
                />
              </div> */}
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
                <div
                  className="xl:w-fit w-full flex h-full justify-center items-center"
                  data-aos="fade"
                  data-aos-duration="2000"
                  data-aos-delay="600"
                >
                  <AddButton text="Nuevo Entrenamiento" url="/entrenamientos/cargar"/>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center px-4 justify-center w-full rounded-lg mb-3">
              <TablaHorarios
                pageTotal={pageTotal}
                pageFilter={pageFilter}
                filter={filterData}
                isFilter={isFilter}
              />
              <PaginationHorarios
                pageTotal={pageTotal}
                isFilter={isFilter}
                pageFilter={pageFilter}
                setPageTotal={functionSetPageTotal}
                setPageFilter={functionSetPageFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorarioDia;
