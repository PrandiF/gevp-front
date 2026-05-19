import { useEffect, useRef, useState } from "react";

interface Props {
  event: any;
  position: { x: number; y: number };
  onClose: () => void;
  onCancelClick: () => void;
}

const sportColors: Record<string, string> = {
  Cesto: "#34A853",
  "Gimnasia Rítmica": "#9C27B0",
  "Voley Femenino": "#b68904ff",
  "Voley Masculino": "#FBBC05",
  Básquet: "#0066CC",
  "No Federados": "#F44336",
  "Otras Actividades": "#00c0b3",
};

export default function EventHoverPreview({
  event,
  position,
  onClose,
  onCancelClick,
}: Props) {
  if (!event) return null;

  const sport = event.deporte;
  const bgColor = sportColors[sport] || "#1E88E5";

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [modalLeft, setModalLeft] = useState(position.x);

  // true = flecha a la izquierda
  // false = flecha a la derecha
  const [arrowLeft, setArrowLeft] = useState(false);

  useEffect(() => {
    const modalWidth = 256; // w-64
    const margin = 16;

    // posición normal -> modal a la izquierda del evento
    let left = position.x - 438;

    // flecha del lado derecho por defecto
    let shouldArrowBeLeft = false;

    // si no entra a la izquierda
    if (left < margin) {
      // mover modal a la derecha del evento
      left = position.x + 20;

      // mover flecha al lado izquierdo
      shouldArrowBeLeft = true;
    }

    // evitar overflow derecho
    if (left + modalWidth > window.innerWidth - margin) {
      left = window.innerWidth - modalWidth - margin;
    }

    setModalLeft(left);
    setArrowLeft(shouldArrowBeLeft);
  }, [position]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="fixed z-50 w-64 rounded-xl shadow-2xl text-white"
      style={{
        backgroundColor: bgColor,
        top: position.y,
        left: modalLeft,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-white/80 hover:text-white text-xl font-bold"
      >
        ×
      </button>

      {/* flecha */}
      <div
        className={`absolute top-5 w-4 h-4 rotate-45 ${
          arrowLeft ? "left-[-8px]" : "right-[-8px]"
        }`}
        style={{ backgroundColor: bgColor }}
      />

      <div className="p-4">
        <p className="text-xs opacity-80 tracking-wide">
          {event.tipoDeActividad?.toUpperCase()}
        </p>

        <p className="text-xs opacity-80 tracking-wide">
          {event.deporte?.toUpperCase()}
        </p>

        <h3 className="font-bold text-lg">{event.categoria}</h3>

        <p className="text-sm mt-1 opacity-90">{event.gimnasio}</p>

        <div className="flex gap-2">
          <p className="text-sm mt-1 opacity-90">
            {`${new Date(event.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })} hs`}
          </p>
          -
          <p className="text-sm mt-1 opacity-90">
            {`${new Date(event.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })} hs`}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCancelClick();
          }}
          className="mt-4 bg-white/20 hover:bg-white/30 transition rounded-lg px-3 py-2 text-sm font-semibold w-full"
        >
          Cancelar actividad
        </button>
      </div>
    </div>
  );
}
