import style from "./pagination.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pages from "./pagesOfpagination/pagesOfpagination";
// import Cards from '../cards/cards';

import { countriesRender, stateCurrentPage } from "../../redux/actions/actions";

const Pagination = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.upDateCountries); // nos traemos todos los paises // Esto se modifica porque no me lo renderiza?
  // const [countries, setCountries] = useState(allCountries);
  const currentPage = useSelector((state) => state.currentPage);
  const countriesXpage = 10;
  const indexLastCountryXpage = currentPage * countriesXpage - 1;
  const indexfirstCountryXpage = indexLastCountryXpage - countriesXpage;
  // const [firstPage, setFirstPage] = useState([]);
  const currentCountries = allCountries.slice(
    indexfirstCountryXpage,
    indexLastCountryXpage
  );

  // console.log("firstPage:", firstPage);
  console.log("currentPage", currentPage);

  const firstPage = allCountries.slice(0, 9);
  // console.log("firstPage", firstPage);

  const selectPage = (numPage) => {
    dispatch(stateCurrentPage(numPage));
  };

  // useEffect(() => {
  //   setCountries(allCountries);
  // }, [allCountries]);

  useEffect(() => {
    dispatch(stateCurrentPage(1));
    // setFirstPage(allCountries.slice(0, 9));
    dispatch(countriesRender(firstPage));
    console.log("Ahora nee");
  }, [allCountries]); // updatecountries

  console.log("allCountries:", allCountries);

  // Dejo asi como ya venia trabajando, las cartas que se muestran estan en un global
  useEffect(() => {
    console.log("ahora perreque");
    currentPage === 1
      ? dispatch(countriesRender(firstPage))
      : dispatch(countriesRender(currentCountries));
  }, [currentPage]);

  return (
    <div className={style.container}>
      {/* <Cards countries={currentPage === 1 ? firstPage : currentCountries} /> */}
      <Pages
        allCountries={allCountries}
        countriesXpage={countriesXpage}
        selectPage={selectPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Pagination;

// const ITEMS_PAGE = 10;

// const Pagination = () => {
//   // Traigo paises del store
//   // Creo un stado interno, el cual va a almacenar los 10 items por page
//   // Uso el useEffect para que al montarse el componente se inicialice el stado interno con los 10 items
//   const dataDB = useSelector((state) => state.upDateCountries);

//   const [items, setItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   const [pages, setPages] = useState(0);

//   useEffect(() => {
//     setItems([...dataDB].splice(0, ITEMS_PAGE)); // Hago esto porque pasando este splice al state items como valor inicial no me lo toma!!
//     setPages(Math.ceil(dataDB.length / ITEMS_PAGE));
//     setCurrentPage(0);
//   }, [dataDB]);

//   // actualizo el stado con el numero de pagina en la que estoy parado
//   // actualizo el primer indice del splite >> 10,20,30,...
//   const next = () => {
//     const nextPage = currentPage + 1;
//     const firstItem = nextPage * ITEMS_PAGE;

//     if (firstItem >= dataDB.length) return; // que corte la funcion en caso que el primer item sea el ultimo del array countries del store
//     console.log('dataDB', dataDB);
//     setItems([...dataDB].splice(firstItem, ITEMS_PAGE));
//     setCurrentPage(nextPage);
//   };

//   const prev = () => {
//     const prevPage = currentPage - 1;
//     if (prevPage < 0) return; // si la pagina es menor a 0 corta la funcion
//     const firstItem = prevPage * ITEMS_PAGE;
//     setItems([...dataDB].splice(firstItem, ITEMS_PAGE));
//     setCurrentPage(prevPage);
//   };

//   return (
//     <div>
//       <button onClick={prev}> Prev </button>
//       <p>
//         {currentPage + 1} of {pages}
//       </p>
//       <button onClick={next}> Next </button>
//       <Wrapper data={items} />
//       {}
//     </div>
//   );
// };

// export default Pagination;
