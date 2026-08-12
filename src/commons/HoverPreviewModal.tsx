import { useEffect, useRef, useState } from "react";
import {
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineClipboardDocumentList,
  HiOutlinePencilSquare,
  HiOutlineXMark,
} from "react-icons/hi2";

import { MdSports } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

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

const sportIcons: Record<string, React.ReactNode> = {
  Básquet: "🏀",
  "Voley Femenino": "🏐",
  "Voley Masculino": "🏐",
  Cesto: "🏐",
  "Gimnasia Rítmica": "🤸",
  "Otras Actividades": "🏋️",
};
export default function EventHoverPreview({
  event,
  position,
  onClose,
  onCancelClick,
}: Props) {
  const navigate = useNavigate();

  const startTime = new Date(event.start).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const endTime = new Date(event.end).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  if (!event) return null;
  // const navigate = useNavigate();
  const sport = event.deporte;
  const bgColor = sportColors[sport] || "#1E88E5";

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [modalLeft, setModalLeft] = useState(position.x);

  // true = flecha a la izquierda
  // false = flecha a la derecha
  const [arrowLeft, setArrowLeft] = useState(false);
  const isMobile = window.innerWidth < 768;

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
      className={`
    fixed z-50 overflow-hidden rounded-2xl text-white
    shadow-[0_20px_60px_rgba(15,23,42,.25)]
    ${isMobile ? "w-[90%] max-w-sm" : "w-72"}
  `}
      style={
        isMobile
          ? {
              background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }
          : {
              background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
              top: position.y,
              left: modalLeft,
            }
      }
      onClick={(e) => e.stopPropagation()}
    >
      {/* Flecha */}
      {!isMobile && (
        <div
          className={`absolute top-5 h-4 w-4 rotate-45 ${
            arrowLeft ? "left-[-8px]" : "right-[-8px]"
          }`}
          style={{
            background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
          }}
        />
      )}

      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/15"
      >
        <HiOutlineXMark size={20} />
      </button>

      <div className="p-5">
        {/* Header */}
        <div className="pr-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-80">
            {sportIcons[event.deporte] ?? <MdSports size={14} />}
            <span>{event.deporte}</span>
          </p>

          <h3 className="mt-2 text-2xl font-bold leading-tight">
            {event.categoria}
          </h3>
        </div>

        {/* Información */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2 opacity-95">
            <HiOutlineMapPin size={17} />
            <span>{event.gimnasio}</span>
          </div>

          <div className="flex items-center gap-2 opacity-95">
            <HiOutlineClock size={17} />
            <span>
              {startTime} hs - {endTime} hs
            </span>
          </div>

          <div className="flex items-center gap-2 opacity-95">
            <HiOutlineClipboardDocumentList size={17} />
            <span>{event.tipoDeActividad}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();

              navigate("/cargar", {
                state: {
                  event,
                },
              });
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              true
                ? "cursor-not-allowed bg-white/10 text-white/50"
                : "bg-white/20 hover:bg-white/30"
            }`}
            disabled
          >
            <HiOutlinePencilSquare size={17} />
            Editar
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancelClick();
            }}
            className="flex flex-1 items-center justify-center rounded-xl bg-red-500/80 px-3 py-2.5 text-sm font-semibold transition hover:bg-red-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
