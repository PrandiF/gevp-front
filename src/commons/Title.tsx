type TitleProps = {
  text: string | null;
};

function Title({ text }: TitleProps) {
  return (
    <div className="z-20 text-celeste w-full flex justify-center items-center font-raleway">
      <p className="xl:text-4xl text-3xl font-bold z-20">{text}</p>
    </div>
  );
}

export default Title;
