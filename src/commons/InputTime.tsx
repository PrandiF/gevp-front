import { FiClock } from "react-icons/fi";
import Select from "react-select";

type InputTimeProps = {
  placeholder?: string;
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
};

function InputTime({ value, onChange, disabled = false }: InputTimeProps) {
  const options = [];

  for (let h = 8; h <= 23; h++) {
    for (const m of [0, 30]) {
      if (h === 23 && m === 30) continue;

      const hour = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0",
      )}`;

      options.push({
        value: hour,
        label: hour,
      });
    }
  }

  return (
    <div className="relative w-full group">
      <Select
        isDisabled={disabled}
        placeholder="Seleccionar hora..."
        value={options.find((o) => o.value === value) || null}
        options={options}
        onChange={(option) => onChange?.(option?.value ?? "")}
        isSearchable={false}
        menuPlacement="auto"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: 48,
            borderRadius: 12,
            borderColor: state.isFocused ? "#1d91d9" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 4px rgb(219 234 254)" : "none",
            cursor: disabled ? "not-allowed" : "pointer",
            paddingRight: 30,
            transition: "all .2s ease",

            "&:hover": {
              borderColor: "#1d91d9",
            },
          }),

          container: (base) => ({
            ...base,
            cursor: disabled ? "not-allowed" : "pointer",
          }),

          valueContainer: (base) => ({
            ...base,
            paddingLeft: 12,
          }),

          input: (base) => ({
            ...base,
            cursor: disabled ? "not-allowed" : "pointer",
          }),

          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),

          menu: (base) => ({
            ...base,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,.12)",
          }),

          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isSelected
              ? "#157cbc"
              : state.isFocused
                ? "#eff6ff"
                : "white",
            color: state.isSelected ? "white" : "#334155",
            paddingTop: 10,
            paddingBottom: 10,
            transition: "all .15s ease",
          }),

          singleValue: (base) => ({
            ...base,
            color: "#1f2937",
          }),

          indicatorSeparator: () => ({
            display: "none",
          }),

          dropdownIndicator: () => ({
            display: "none",
          }),
        }}
      />

      <FiClock
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-[#157cbc]"
      />
    </div>
  );
}

export default InputTime;
