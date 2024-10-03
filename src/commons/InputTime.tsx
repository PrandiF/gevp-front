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
  const flatpickrInstanceRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (timePickerRef.current) {
      flatpickrInstanceRef.current = flatpickr(timePickerRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultDate: value,
        onChange: (_, dateStr) => {
          if (onChange) {
            onChange(dateStr);
          }
        },
      });

      return () => {
        flatpickrInstanceRef.current?.destroy();
      };
    }
  }, [onChange, value]);

  useEffect(() => {
    if (clean && timePickerRef.current) {
      timePickerRef.current.value = "";
      flatpickrInstanceRef.current?.clear();
    }
  }, [clean]);

  return (
    <input
      readOnly={readonly}
      placeholder={placeholder}
      ref={timePickerRef}
      className={`w-${width} bg-white rounded-3xl h-[2rem] px-3 border border-celeste outline-none cursor-pointer text-black`}
      style={{ width: "100%", minWidth: "0" }}
    />
  );
}

export default InputTime;
