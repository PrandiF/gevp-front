import { useEffect, useState } from "react";

type InputSelectProps = {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  width?: string;
  value?: string;
  clean?: boolean;
  name: string;
  readonly?: boolean;
};

function InputSelect({
  options,
  onChange,
  placeholder,
  width,
  value,
  clean,
  name,
  readonly,
}: InputSelectProps) {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (clean) {
      setSelected(""); // Limpiar el valor seleccionado
    }
  }, [clean]);

  return (
    <div className="relative w-full">
      <select
        name={name} // Añadir el atributo name al select
        onChange={handleChange}
        value={selected}
        className={`w-${width} bg-white rounded-3xl h-[2rem] px-3 border border-celeste outline-none cursor-pointer ${
          selected === "" ? "text-[#b4b9c3]" : "text-black"
        }`}
        disabled={readonly}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
