import Aos from "aos";
import { useEffect } from "react";

type ButtonSubmitProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEnter?: () => void;

  submit?: boolean;
};

function ButtonSubmit({ text, onClick, submit }: ButtonSubmitProps) {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <button
      data-aos="fade"
      data-aos-duration="2500"
      data-aos-delay="400"
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className="flex justify-center items-center gap-2 py-2 xl:w-[150px] w-[120px] mx-auto  cursor-pointer rounded-3xl shadow-2xl text-white font-semibold bg-gradient-to-r from-[#7fc7f3] via-[#1d91d9] to-[#157cbc] hover:shadow-deep-shadow  hover:scale-105 duration-300"
    >
      {text}
    </button>
  );
}

export default ButtonSubmit;
