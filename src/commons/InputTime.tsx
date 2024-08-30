import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

type TimePickerProps = {
  placeholder?: string;
  onChange?: (date: string) => void;
  width?: string;
  clean?: boolean;
  readonly?: boolean;
  value?: string;
};

function InputTime({
  placeholder,
  onChange,
  width = "full",
  clean,
  readonly,
  value,
}: TimePickerProps) {
  const timePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timePickerRef.current) {
      const fp = flatpickr(timePickerRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultDate: value,
        onChange: (selectedDates, dateStr) => {
          if (onChange) {
            console.log(selectedDates);
            onChange(dateStr);
          }
        },
      });

      return () => {
        fp.destroy();
      };
    }
  }, [onChange, value]);

  useEffect(() => {
    if (clean && timePickerRef.current) {
      timePickerRef.current.value = "";
    }
  }, [clean]);

  return (
    <input
      readOnly={readonly}
      placeholder={placeholder}
      ref={timePickerRef}
      className={`w-${width} bg-white rounded-3xl h-[2rem] px-3 border border-celeste outline-none cursor-pointer text-black`}
    />
  );
}

export default InputTime;
