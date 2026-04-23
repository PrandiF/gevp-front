import { useState } from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  open: boolean;
  onClose: () => void;
  onDeleteSingle: () => Promise<void>;
  onDeleteSeries: () => Promise<void>;
  event: any;
  isInstance: boolean;
}

export default function ConfirmCancelModal({
  open,
  onClose,
  onDeleteSingle,
  onDeleteSeries,
  event,
  isInstance,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (!open || !event) return null;

  /* =========================
     HANDLERS CON LOADER
  ========================= */

  const handleDeleteSingle = async () => {
    setIsLoading(true);
    try {
      await onDeleteSingle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSeries = async () => {
    setIsLoading(true);
    try {
      await onDeleteSeries();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[420px] p-6 animate-scaleIn">
        {/* 🔥 OVERLAY LOADER */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-2xl z-50">
            <ClipLoader color="#4D5061" size={50} />

            <p className="mt-4 text-gray-700 text-sm font-medium">
              Cancelando actividad...
            </p>
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-800">Cancelar actividad</h2>

        <p className="text-gray-600 mt-3">
          {isInstance
            ? "¿Qué querés cancelar?"
            : "Este entrenamiento no es recurrente."}
        </p>

        {/* INFO EVENTO */}
        <div className="mt-4 bg-gray-100 rounded-lg p-3 text-sm text-black">
          <p className="font-semibold">{event.deporte?.toUpperCase()}</p>
          <p>{event.categoria}</p>
          <p>{event.gimnasio}</p>

          <p className="text-gray-500">
            {new Date(event.start).toLocaleString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            -
            {new Date(event.end).toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>

        {/* BOTONES */}
        <div className="flex flex-col gap-3 mt-6">
          {isInstance && (
            <button
              onClick={handleDeleteSingle}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition font-semibold disabled:opacity-50"
            >
              Cancelar solo este día
            </button>
          )}

          <button
            onClick={handleDeleteSeries}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition font-semibold disabled:opacity-50"
          >
            Cancelar actividad completa
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold disabled:opacity-50"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
