import { useEffect, useState } from "react";

type InputSelectProps = {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string | null;
  width?: string;
  value?: string;
  clean?: boolean;
  name: string;
  readonly?: boolean;
  disabled?: boolean;
};

function InputSelect({
  options,
  onChange,
  placeholder,
  value,
  clean,
  name,
  readonly,
  disabled,
}: InputSelectProps) {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (clean) {
      setSelected("");
    }
  }, [clean]);

  return (
    <div className="relative w-full">
      <select
        name={name}
        onChange={handleChange}
        value={selected}
        className={`w-full h-12 px-4 rounded-xl border border-gray-300 bg-white transition-all duration-200 hover:border-[#1d91d9] focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1d91d9] ${selected === "" ? "text-gray-400" : "text-gray-800"} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        disabled={readonly || disabled}
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
