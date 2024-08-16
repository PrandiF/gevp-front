type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onEnter?: () => void;
  url?: string;
};

function OptionButton({ text, url }: ButtonProps) {
  return (
    <a href={url} className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-celeste rounded-md group xl:h-[70px] md:h-[50px] h-[50px] xl:w-[300px] md:w-[270px] w-[250px]">
      <span className="absolute top-0 right-0 inline-block transition-all duration-500 ease-in-out bg-celeste rounded group-hover:-mr-4 group-hover:-mt-4 xl:w-[300px] xl:h-[50px]">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white "></span>
      </span>
      <span className="absolute bottom-0 rotate-180 left-0 inline-block  transition-all duration-500 ease-in-out bg-celeste rounded group-hover:-ml-4 group-hover:-mb-4 h-[50px]">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-button1-gradient rounded-md group-hover:translate-x-0"></span>
      <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white text-xl">
        {text}
      </span>
    </a>
  );
}

export default OptionButton;
//  <a
//       href={url}
//       onClick={onClick}
//       className="z-30 bg-button1-gradient  xl:h-[70px] md:h-[50px] h-[50px] xl:w-[300px] md:w-[270px] w-[250px] flex items-center justify-center shadow-deep-shadow rounded-[2rem] cursor-pointer hover:brightness-95 text-xl border border-white"
//     >
//       {text}
//     </a>
