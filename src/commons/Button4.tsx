type Button4Props = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onEnter?: () => void;
  url?: string;
};

function Button4({ text, onClick, url }: Button4Props) {
  return (
    <a
      href={url}
      onClick={onClick}
      className="flex justify-center items-center gap-2 py-2 xl:w-[150px] md:w-[120px] w-[100px] cursor-pointer rounded-3xl shadow-2xl text-white font-semibold bg-gradient-to-r from-[#7fc7f3] via-[#1d91d9] to-[#157cbc] hover:shadow-deep-shadow  hover:scale-105 duration-300"
    >
      {text}
    </a>
  );
}

export default Button4;
