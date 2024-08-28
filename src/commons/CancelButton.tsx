type CancelButtonProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
function CancelButton({ onClick }: CancelButtonProps) {
  return (
    <div
      onClick={onClick}
      className="inline-flex items-center px-6 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-3xl cursor-pointer"
    >
      <p>Cancelar</p>
    </div>
  );
}

export default CancelButton;
