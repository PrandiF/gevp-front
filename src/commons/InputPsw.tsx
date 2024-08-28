import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type InputPswProps = {
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function InputPsw({ name, value, onChange }: InputPswProps) {
  const [showPsw, setShowPsw] = useState(false);

  const handlePswVisibility = () => {
    setShowPsw((prevShowPsw) => !prevShowPsw);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
  return (
    <div className="relative w-full">
      <input
        type={showPsw ? "text" : "password"}
        placeholder="Contraseña"
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full bg-white text-black rounded-3xl h-[2rem] pl-3 pr-10 border border-celeste outline-none"
      />
      <button
        type="button"
        onClick={handlePswVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {showPsw ? (
          <IoEyeOffOutline className="text-black w-[22px] h-[22px]" />
        ) : (
          <IoEyeOutline className="text-black w-[22px] h-[22px]" />
        )}
      </button>
    </div>
  );
}

export default InputPsw;
