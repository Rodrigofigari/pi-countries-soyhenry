import style from './pagination.module.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from './pagesOfpagination/pagesOfpagination';
// import Cards from '../cards/cards';

import { countriesRender, stateCurrentPage } from '../../redux/actions/actions';

const Pagination = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.upDateCountries); // nos traemos todos los paises // Esto se modifica porque no me lo renderiza?
  const currentPage = useSelector((state) => state.currentPage);
  const countriesXpage = 10;
  const indexLastCountryXpage = currentPage * countriesXpage - 1;
  const indexfirstCountryXpage = indexLastCountryXpage - countriesXpage;

  const currentCountries = allCountries.slice(
    indexfirstCountryXpage,
    indexLastCountryXpage
  );

  console.log('currentPage', currentPage);

  const firstPage = allCountries.slice(0, 9);
  // console.log("firstPage", firstPage);

  const selectPage = (numPage) => {
    dispatch(stateCurrentPage(numPage));
  };

  useEffect(() => {
    dispatch(stateCurrentPage(1));
    dispatch(countriesRender(firstPage));
  }, [allCountries]); // updatecountries

  // Dejo asi como ya venia trabajando, las cartas que se muestran estan en un global
  useEffect(() => {
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
