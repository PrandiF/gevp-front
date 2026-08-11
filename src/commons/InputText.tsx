type InputTextProps = {
  placeholder?: string;
  width?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly?: boolean;
};

function InputText({
  placeholder,

  name,
  value,
  onChange,
  readonly,
}: InputTextProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={handleChange}
      className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 transition-all duration-200 hover:border-[#1d91d9] focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1d91d9] cursor-pointer"
      readOnly={readonly}
      disabled={readonly}
    />
  );
}

export default InputText;
