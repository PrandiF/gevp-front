import Title from "../../commons/Title";
import BackButton from "../../commons/BackButton";
import Header from "../Header";
import { useParams } from "react-router-dom";
import Agenda from "./Agenda";

function HorarioGimnasios() {
  const { gimnasio } = useParams<{ gimnasio: string }>();

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
              <Title text={gimnasio?.split("_").join(" ") || ""} />
            </div>
            <div className="flex flex-col items-center px-4 justify-center w-full rounded-lg mb-3">
              <Agenda />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorarioGimnasios;
