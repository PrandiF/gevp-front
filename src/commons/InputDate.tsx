import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DatePickerProps {
  placeholder?: string;
  onChange?: (date: string) => void;
  clean?: boolean;
  readonly?: boolean;
  value?: string;
}

const InputDate: React.FC<DatePickerProps> = ({
  placeholder,
  onChange,
  clean = false,
  readonly = false,
  value = "",
}) => {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!datePickerRef.current) return;

    flatpickrRef.current = flatpickr(datePickerRef.current, {
      locale: Spanish,

      altInput: true,
      altFormat: "d-m-Y",

      dateFormat: "Y-m-d",

      defaultDate: value || undefined,

      allowInput: false,

      onChange: (selectedDates) => {
        if (selectedDates.length === 0) {
          onChangeRef.current?.("");
          return;
        }

        const selectedDate = selectedDates[0];

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

  useEffect(() => {
    if (!flatpickrRef.current) return;

    if (value) {
      flatpickrRef.current.setDate(value, false, "Y-m-d");
    } else {
      flatpickrRef.current.clear();
    }
  }, [value]);

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
        className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 transition-all duration-200 hover:border-[#1d91d9] focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1d91d9] cursor-pointer"
      />

      <FaRegCalendarAlt
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={18}
      />
    </div>
  );
};

export default InputDate;
