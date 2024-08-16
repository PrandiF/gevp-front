import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import Card from "./Card";
import imgCargar from "../../assets/imagenCargar.png";
import imgConsultar from "../../assets/imagenConsultar.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function RespnosiveCards() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="flex flex-col w-screen relative ">
      <div
        className="w-full rounded-sm relative"
        data-aos="fade-up"
         data-aos-duration="2000"
        data-aos-delay="400"
      >
        <div className="swiper-button-prev-serv absolute left-5 top-[50%] transform z-10">
          <BsFillArrowLeftSquareFill className="w-8 h-8 cursor-pointer rounded-xl" />
        </div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ el: ".swiper-pagination-serv", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next-serv",
            prevEl: ".swiper-button-prev-serv",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="h-full w-[65%] relative flex items-center m-auto mt-4"
        >
          <SwiperSlide className="w-[80%] h-[90%] relative flex justify-center">
            <Card img={imgCargar} buttonText="Cargar" buttonHref="/cargar" />
          </SwiperSlide>
          <SwiperSlide className="w-[80%] h-[90%] relative flex justify-center">
            <Card
              img={imgConsultar}
              buttonText="Consultar"
              buttonHref="/consultar"
            />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-next-serv absolute right-5 top-[50%] transform  z-10">
          <BsFillArrowRightSquareFill className="w-8 h-8 cursor-pointer rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default RespnosiveCards;
