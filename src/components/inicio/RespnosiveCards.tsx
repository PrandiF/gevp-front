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
import entrenamientosImg from "../../assets/entrenamientos2.png";
import eventosImg from "../../assets/eventos.png";
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
        <div className="swiper-button-prev-serv absolute left-12 top-[50%] transform z-10">
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
          className="h-full w-[55%] relative flex items-center mx-auto mt-4"
        >
          <SwiperSlide className="w-[80%] h-[90%] relative flex justify-center items-center">
            <Card
              img={entrenamientosImg}
              text="Entrenamientos"
              buttonHref="/entrenamientos"
            />
          </SwiperSlide>
          <SwiperSlide className="w-[80%] h-[90%] relative flex justify-center items-center">
            <Card img={eventosImg} text="Eventos" buttonHref="/eventos" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-next-serv absolute right-12 top-[50%] transform  z-10">
          <BsFillArrowRightSquareFill className="w-8 h-8 cursor-pointer rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default RespnosiveCards;
