type TimePickerProps = {
  placeholder?: string;
  onChange?: (time: string) => void;
  value?: string; // formato HH:mm
  width?: string;
  step?: number; // segundos
};

function InputTime({
  placeholder,
  onChange,
  value,
  width = "full",
  step = 1800, // 30 minutos
}: TimePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{placeholder}</label>

      <input
        type="time"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        step={step}
        className={`w-${width}
      bg-white
      rounded-3xl
      h-[2.5rem]
      px-3
      border
      border-celeste
      outline-none
      text-black
      focus:ring-2
      focus:ring-celeste
    `}
      />
    </div>
  );
}

export default InputTime;

// import { useEffect, useRef } from "react";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// type TimePickerProps = {
//   placeholder?: string;
//   onChange?: (time: string) => void;
//   value?: string; // formato "HH:mm"
//   width?: string;
// };

// function InputTime({
//   placeholder,
//   onChange,
//   value,
//   width = "full",
// }: TimePickerProps) {
//   const ref = useRef<HTMLInputElement>(null);
//   const fp = useRef<flatpickr.Instance | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       fp.current = flatpickr(ref.current, {
//         enableTime: true,
//         noCalendar: true,
//         dateFormat: "H:i",
//         time_24hr: true,
//         defaultDate: value || undefined,
//         onChange: (_, dateStr) => {
//           if (onChange) onChange(dateStr);
//         },
//         allowInput: true, // permite escribir con teclado sin borrar
//       });

//       return () => fp.current?.destroy();
//     }
//   }, [onChange]);

//   useEffect(() => {
//     if (fp.current && value) {
//       fp.current.setDate(value, false, "H:i");
//     }
//   }, [value]);

//   return (
//     <input
//       ref={ref}
//       placeholder={placeholder}
//       className={`w-${width} bg-white rounded-3xl h-[2.5rem] px-3 border border-celeste outline-none text-black`}
//     />
//   );
// }

// export default InputTime;
