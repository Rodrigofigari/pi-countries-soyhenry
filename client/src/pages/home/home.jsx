import style from './home.module.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Cards from '../../components/cards/cards';
import Filters from '../../components/filters/filters';
import Pagination from '../../components/pagination/pagination';
import Navbar from '../../components/navbar/navbar';

import { getCountries } from '../../redux/actions/actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={style.containerHome}>
      <Navbar />
      <Filters />

      <div className={style.divCards}>
        <Cards />
      </div>

      <Pagination />
    </div>
  );
};

export default Home;

// 1. si no pongo el array de dependencia, ante cualquier cambio en el estado se vuelve a ejecutar + al montarse
// 2. si pongo el array de dependencia vacio le indico que solo quiero que se ejecute una sola vez al montarse
// 3. si pongo una dependencia dentro del array le indico que se ejecute cada vez que esa dependencia se actualize/modifique
