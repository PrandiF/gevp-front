type ButtonSubmitProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEnter?: () => void;
  icon?: React.ReactNode;
  submit?: boolean;
  disabled?: boolean;
};

function ButtonSubmit({
  text,
  onClick,
  submit,
  icon,
  disabled,
}: ButtonSubmitProps) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className="
  flex
  h-12
  w-44
  items-center
  justify-center
  rounded-xl
  bg-gradient-to-r
  from-[#43b4ff]
  to-[#157cbc]
  font-semibold
  text-white
  shadow-lg

  transition-all
  duration-200
  ease-out

  hover:-translate-y-0.5
  hover:scale-[1.02]
  hover:shadow-xl

  active:translate-y-0
  active:scale-[0.98]

  disabled:opacity-60
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  disabled:hover:translate-y-0
"
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span>{text}</span>
      </div>
    </button>
  );
}

export default ButtonSubmit;
