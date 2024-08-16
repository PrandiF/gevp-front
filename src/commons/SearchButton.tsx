type SearchButtonProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <div
      onClick={onClick}
      className="bg-button1-gradient text-white flex items-center justify-center rounded-2xl cursor-pointer hover:brightness-95 duration-200 ease-in-out transition-all"
    >
      <p className="flex text-base px-6 py-1">Buscar</p>
    </div>
  );
}

export default SearchButton;
