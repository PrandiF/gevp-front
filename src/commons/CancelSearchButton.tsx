function CancelSearchButton() {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer flex " />
      <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-8 shadow-md  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-6 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75  after:-rotate-180 peer-checked:after:rotate-0 before:flex before:justify-center before:items-center"></div>
    </label>
  );
}

export default CancelSearchButton;
