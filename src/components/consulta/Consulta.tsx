import BackButton from "../../commons/BackButton";
import InputDate from "../../commons/InputDate";
// import InputText from "../../commons/InputText";
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

function Consulta() {
  const { role } = useUserStoreLocalStorage();
  useEffect(() => {
    AOS.init();
  }, []);

  const initialFilterData = {
    gimnasio: "",
    horarioInicio: "",
    horarioFin: "",
    fecha: new Date("1900-01-01"),
  };

  const [filterData, setFilterData] = useState(initialFilterData);
  const [isFilter, setIsFilter] = useState(false);
  const [pageTotal, setPageTotal] = useState(1);
  const [pageFilter, setPageFilter] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    isFilter && setIsFilter(false)
    setFilterData((prevEventoData) => ({
      ...prevEventoData,
      [e.target.name]: e.target.value,
    }));
    
  };

  const handleDateChange = (name: string) => (date: string) => {
    isFilter && setIsFilter(false)
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
    <div className="relative flex w-full items-start z-20 xl:py-0 xl:pt-[5%] md:py-0 md:pt-[5%] py-[8%]">
      <Header />
      <div className="flex w-full items-start flex-col gap-8">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[90%] w-[96%]  items-center gap-10 xl:py-8 py-3 mx-auto xl:mt-[3%] mt-[13%] rounded-3xl">
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
                <InputDate
                  placeholder="Fecha"
                  clean={!isFilter}
                  width="full"
                  onChange={handleDateChange("fecha")}
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
                {role == "admin" ? (
                  <div
                    className="xl:w-fit w-full flex h-full justify-center items-center"
                    data-aos="fade"
                    data-aos-duration="2000"
                    data-aos-delay="600"
                  >
                    <AddButton text="Nuevo Evento" url="/eventos/cargar" />
                  </div>
                ) : (
                  ""
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
