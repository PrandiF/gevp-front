import { HiOutlinePencilSquare } from "react-icons/hi2";

interface Props {
  open: boolean;
  onClose: () => void;
  onSingle: () => void;
  onSeries: () => void;
}

export default function EditRecurringModal({
  open,
  onClose,
  onSingle,
  onSeries,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Icono */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <HiOutlinePencilSquare className="text-3xl text-blue-600" />
        </div>

        {/* Título */}
        <h2 className="mt-5 text-center text-2xl font-bold text-gray-800">
          Editar actividad
        </h2>

        {/* Texto */}
        <p className="mt-3 text-center text-gray-500">
          Esta actividad pertenece a una serie recurrente.
          <br />
          ¿Cómo querés aplicar los cambios?
        </p>

        {/* Botones */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onSingle}
            className="rounded-xl border border-blue-500 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Editar solo esta actividad
          </button>

          <button
            onClick={onSeries}
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Editar toda la serie
          </button>

          <button
            onClick={onClose}
            className="mt-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
