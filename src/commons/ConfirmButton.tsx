type Button1Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function ConfirmButton({ onClick }: Button1Props) {
  return (
    <div
      onClick={onClick}
      className="inline-flex items-center px-6 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-3xl cursor-pointer"
    >
      <p>Confirmar</p>
    </div>
  );
}

export default ConfirmButton;
 