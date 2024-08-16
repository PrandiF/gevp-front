type pageProp = {
  pageTotal: number;
  setPageTotal: Function;
  pageFilter: number;
  setPageFilter: Function;
  isFilter: boolean;
};

const Pagination = ({
  pageTotal,
  setPageTotal,
  pageFilter,
  setPageFilter,
  isFilter,
}: pageProp) => {
  const nextPage = () => {
    isFilter ? setPageFilter(pageFilter + 1) : setPageTotal(pageTotal + 1);
  };
  const prevPage = () => {
    isFilter && pageFilter > 1
      ? setPageFilter(pageFilter - 1)
      : pageTotal > 1 && setPageTotal(pageTotal - 1);
  };
  return (
    <div className="opacity-95 gap-5 bg-button1-gradient h-12 flex justify-center items-center shadow-xl xl:w-[90%] w-[99%] rounded-b-lg xl:mb-0">
      <button
        onClick={prevPage}
        className="cursor-pointer duration-200 active:scale-125"
        title="Go Back"
      >
        <img
          className="invert"
          width={30}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADXUlEQVR4nO2az0tVQRTHP5HpCyPz6cuWuQyj+icqLSt1Z9musE0mFrQqXVurQPDvKEQsKoSK7IfVpjJ1VbmIbNdTsXhx6HthqPfzvvvmXcUvXHh6Zuacc+fMmTPfubCFzYsk0AXcAiaAj8APYE2P/f4gmbU5AzQSEySA88B94DeQKfH5BUwBfUBdNRzYCVwFlhyjVoFHwA3NzAG98R16GvU/k90EHqtP0P8rMKSX4wUngUXHgJfABaAhxFh7gIvAK2e8BaCDCsLe1Lij8DVwLMLx24E3zvhjlZidfTLcFPwELgPbo1bC3zGvAGlntluiGrxV051R1jlI5XEImJPOedlQFlLOgC+AZvyhEXgi3YuKilBIOOH0DKjHP+qB506YhVoz40442WZXLTQ5UWEJoOQUGyxsH2uimDWTlk2W3Yre7IJ9wrJTXDDoLP6iQuyas09UIsWGRQ3wVraZU3lRp1LBGh8lfjgh25YKzUqfkyHiiG1OJj2br+EDNbLaKa7ol42TuRokVVavhiwADSP42SjXgPVcdnbL04dlOGH9fWBauk5lE96W0M4TYZ3w5ciIdI1mE05IeDrkoD4d6Zauu9mEnyS0U1xYJ3w50iZdxgv8h2UJk2U44cuRZun6lk24JmFtGU5E+RTauAOeoCxHrsfZkeUSQyuXMz6Qyhdam2axT0hoDGAp+HdmfKAnX/oNNkQjzzb0htglobGFYRDMjM8SpTNXMRYUjcYAxrVoTDpF4+5cjabkqdGYccUl2WhrOifOqZFxsXE9WM3Kxt5CG80XNTxO/NAp2z4Xcw0xpMazMSQf3sm2gWI6JByu1wjluGBINs2VcinUoU5pkWPVxhFgRTaVfJUx5rwBoy2rhZRIObPlTpgBEqKFMiKSq0Fi7wJmZMNMOfeMKRVmwbWC/e0LSeCpdC9EceHT6kythdlh/KyJeem0qnx/VAO3OGGWFvdq6TBq1Cg7rTjhtDdqJQknAWREKHdEuGPbVUawTwQLu6J37+3OtGfExfaH/IohqdopKDsyCqUob4sLzs6gU85kVJFaeT0s3qlNabtWT5MujXrUZtrhCYKyY6BaX0DUiRWf1BGgVIJhXVVsb7UcyIYGcbF2arunu8fvzkc19vu9jqejapvzPLEFNjj+AM/EZqOYLbGmAAAAAElFTkSuQmCC"
        />
      </button>
      <h3 className="font-semibold text-lg">
        {isFilter ? pageFilter : pageTotal}
      </h3>
      <button
        onClick={nextPage}
        className="cursor-pointer duration-200 active:scale-125"
        title="Go Back"
      >
        <img
          className="invert rotate-180"
          width={30}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADXUlEQVR4nO2az0tVQRTHP5HpCyPz6cuWuQyj+icqLSt1Z9musE0mFrQqXVurQPDvKEQsKoSK7IfVpjJ1VbmIbNdTsXhx6HthqPfzvvvmXcUvXHh6Zuacc+fMmTPfubCFzYsk0AXcAiaAj8APYE2P/f4gmbU5AzQSEySA88B94DeQKfH5BUwBfUBdNRzYCVwFlhyjVoFHwA3NzAG98R16GvU/k90EHqtP0P8rMKSX4wUngUXHgJfABaAhxFh7gIvAK2e8BaCDCsLe1Lij8DVwLMLx24E3zvhjlZidfTLcFPwELgPbo1bC3zGvAGlntluiGrxV051R1jlI5XEImJPOedlQFlLOgC+AZvyhEXgi3YuKilBIOOH0DKjHP+qB506YhVoz40442WZXLTQ5UWEJoOQUGyxsH2uimDWTlk2W3Yre7IJ9wrJTXDDoLP6iQuyas09UIsWGRQ3wVraZU3lRp1LBGh8lfjgh25YKzUqfkyHiiG1OJj2br+EDNbLaKa7ol42TuRokVVavhiwADSP42SjXgPVcdnbL04dlOGH9fWBauk5lE96W0M4TYZ3w5ciIdI1mE05IeDrkoD4d6Zauu9mEnyS0U1xYJ3w50iZdxgv8h2UJk2U44cuRZun6lk24JmFtGU5E+RTauAOeoCxHrsfZkeUSQyuXMz6Qyhdam2axT0hoDGAp+HdmfKAnX/oNNkQjzzb0htglobGFYRDMjM8SpTNXMRYUjcYAxrVoTDpF4+5cjabkqdGYccUl2WhrOifOqZFxsXE9WM3Kxt5CG80XNTxO/NAp2z4Xcw0xpMazMSQf3sm2gWI6JByu1wjluGBINs2VcinUoU5pkWPVxhFgRTaVfJUx5rwBoy2rhZRIObPlTpgBEqKFMiKSq0Fi7wJmZMNMOfeMKRVmwbWC/e0LSeCpdC9EceHT6kythdlh/KyJeem0qnx/VAO3OGGWFvdq6TBq1Cg7rTjhtDdqJQknAWREKHdEuGPbVUawTwQLu6J37+3OtGfExfaH/IohqdopKDsyCqUob4sLzs6gU85kVJFaeT0s3qlNabtWT5MujXrUZtrhCYKyY6BaX0DUiRWf1BGgVIJhXVVsb7UcyIYGcbF2arunu8fvzkc19vu9jqejapvzPLEFNjj+AM/EZqOYLbGmAAAAAElFTkSuQmCC"
        />
      </button>
    </div>
  );
};

export default Pagination;
