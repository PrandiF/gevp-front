import BackButton from "../../commons/BackButton";
import InputDate from "../../commons/InputDate";
import SearchButton from "../../commons/SearchButton";
import Title from "../../commons/Title";
import Header from "../Header";
import TablaConsulta from "./TablaConsulta";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import InputSelect from "../../commons/InputSelect";
import CancelSearchButton from "../../commons/CancelSearchButton";
import InputTime from "../../commons/InputTime";
import AddButton from "../../commons/AddButton";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { CiClock1, CiCalendar } from "react-icons/ci";

function Consulta() {
  const { role, hasHydrated } = useUserStoreLocalStorage();

  // Espera la hidratación antes de renderizar
  if (!hasHydrated) return null;

  // Inicializa AOS solo cuando hay datos de localStorage
  useEffect(() => {
    AOS.init();
  }, [hasHydrated]);

  const initialFilterData = {
    deporte: "",
    gimnasio: "",
    horarioInicio: "",
    horarioFin: "",
    fecha: new Date("1900-01-01"),
  };

  const [filterData, setFilterData] = useState(initialFilterData);
  const [isFilter, setIsFilter] = useState(false);
  const [pageTotal, setPageTotal] = useState(1);
  const [pageFilter, setPageFilter] = useState(1);
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

  const handleDateChange = (name: string) => (date: string) => {
    setIsClean(false);
    isFilter && setIsFilter(false);
    setFilterData((prevEventoData) => ({
      ...prevEventoData,
      [name]: date,
    }));
  };

  const handleSearch = () => {
    setIsFilter(true);
  };

  const handleCancel = () => {
    setFilterData(initialFilterData);
    setIsClean(true);
    setIsFilter(false);
    setPageFilter(1);
    setPageTotal(1);
  };

  const functionSetPageTotal = (num: number) => {
    setPageTotal(num);
  };

  const functionSetPageFilter = (num: number) => {
    setPageFilter(num);
  };

  return (
    <div className="relative flex w-full items-start z-20 xl:py-0 xl:pt-[5%] md:py-0 md:pt-[5%] py-[8%]">
      <Header />
      <div className="flex w-full items-start flex-col gap-8">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[90%] w-[96%]  items-center gap-10 xl:py-8 py-3 mx-auto xl:mt-[5%] xl:mb-[3%] mt-[13%] rounded-3xl">
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
              <Title text="Eventos" />
            </div>
            <div className="flex flex-col xl:flex-row gap-5 w-[80%]  xl:w-auto">
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
                  value={filterData.gimnasio}
                  onChange={handleChange}
                  name="gimnasio"
                  clean={isClean}
                />
              </div>

              <div
                className="relative flex items-center gap-3 h-full w-full"
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
                <div className="text-lg text-gray-500 xl:hidden md:hidden">
                  <CiCalendar />
                </div>

                <InputDate
                  placeholder="Fecha"
                  clean={isClean}
                  width="full"
                  onChange={handleDateChange("fecha")}
                />
              </div>
              <div
                className="relative flex items-center gap-3 h-full w-full"
                data-aos="fade"
                data-aos-duration="2000"
                data-aos-delay="600"
              >
                <div className="text-lg text-gray-500 xl:hidden md:hidden">
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
              <div className="flex xl:gap-4 justify-center items-center xl:w-full md:w-[50%] md:mx-auto">
                <button
                  onClick={isFilter ? handleCancel : handleSearch}
                  className="xl:w-fit w-full flex h-full justify-center items-center"
                  data-aos="fade"
                  data-aos-duration="2000"
                  data-aos-delay="600"
                >
                  {isFilter ? (
                    <div className=" text-white flex items-center justify-center rounded-lg cursor-pointer hover:brightness-95 ">
                      <CancelSearchButton />
                    </div>
                  ) : (
                    <SearchButton />
                  )}
                </button>
                {role === "admin" && (
                  <div
                    className="xl:w-fit w-full flex h-full justify-center items-center"
                    data-aos="fade"
                    data-aos-duration="2000"
                    data-aos-delay="600"
                  >
                    <AddButton text="Nuevo Evento" url="/eventos/cargar" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center px-4 justify-center w-full rounded-lg mb-3">
              <TablaConsulta
                pageTotal={pageTotal}
                pageFilter={pageFilter}
                filter={filterData}
                isFilter={isFilter}
              />
              <Pagination
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

export default Consulta;
