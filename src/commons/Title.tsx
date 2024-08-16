type TitleProps = {
  text: string;
};

function Title({ text }: TitleProps) {
  return (
    <div className="z-20 text-celeste w-full flex justify-center items-center font-montserrat">
      <p className="xl:text-4xl lg:text-3xl text-2xl font-bold z-20">{text}</p>
    </div>
  );
}

export default Title;
