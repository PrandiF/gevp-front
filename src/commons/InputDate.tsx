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
  value?: string; // formato YYYY-MM-DD
}

const InputDate: React.FC<DatePickerProps> = ({
  placeholder,
  onChange,
  width = "full",
  clean = false,
  readonly = false,
  value = "",
}) => {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);
  const onChangeRef = useRef(onChange);

  // Mantiene actualizado el callback sin recrear Flatpickr
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Inicializa Flatpickr una sola vez
  useEffect(() => {
    if (!datePickerRef.current) return;

    flatpickrRef.current = flatpickr(datePickerRef.current, {
      locale: Spanish,

      // Lo que ve el usuario
      altInput: true,
      altFormat: "d-m-Y",

      // Valor interno real
      dateFormat: "Y-m-d",

      defaultDate: value || undefined,

      allowInput: false,

      onChange: (selectedDates) => {
        if (selectedDates.length === 0) {
          onChangeRef.current?.("");
          return;
        }

        const selectedDate = selectedDates[0];

        // Formato local YYYY-MM-DD, sin usar UTC
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");

        onChangeRef.current?.(`${year}-${month}-${day}`);
      },
    });

    return () => {
      flatpickrRef.current?.destroy();
      flatpickrRef.current = null;
    };
  }, []);

  // Sincroniza el value externo al editar un evento
  useEffect(() => {
    if (!flatpickrRef.current) return;

    if (value) {
      flatpickrRef.current.setDate(value, false, "Y-m-d");
    } else {
      flatpickrRef.current.clear();
    }
  }, [value]);

  // Limpia el selector
  useEffect(() => {
    if (clean) {
      flatpickrRef.current?.clear();
    }
  }, [clean]);

  return (
    <div className="relative w-full">
      <input
        ref={datePickerRef}
        type="text"
        placeholder={placeholder}
        readOnly={readonly}
        className={`w-${width} bg-white text-black rounded-3xl h-[2rem] px-3 border border-celeste outline-none cursor-pointer`}
      />
    </div>
  );
};

export default InputDate;
