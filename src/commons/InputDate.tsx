import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

interface DatePickerProps {
  placeholder?: string;
  onChange?: (date: string) => void;
  width?: string;
  clean?: boolean;
  readonly?: boolean;
  value?: string;
}

const InputDate: React.FC<DatePickerProps> = ({
  placeholder,
  onChange,
  width = "full",
  clean,
  readonly,
  value,
}) => {
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        locale: Spanish,
        dateFormat: "d-m-y", 
        onChange: (selectedDates) => {
          if (onChange && selectedDates.length > 0) {
            const formattedDate = selectedDates[0].toISOString().split("T")[0]; 
            onChange(formattedDate);
          }
        },
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (clean && datePickerRef.current) {
      datePickerRef.current.value = "";
    }
  }, [clean]);

  return (
    <div className="relative w-full">
      <input
        readOnly={readonly}
        type="text"
        ref={datePickerRef}
        placeholder={placeholder}
        className={`w-${width} bg-white text-black rounded-3xl h-[2rem] px-3 border border-celeste outline-none cursor-pointer`}
        value={value}
      />
    </div>
  );
};

export default InputDate;
