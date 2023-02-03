import React from 'react';
import style from './filters.module.css';
// import { useDispatch } from 'react-redux';

import FilterContinent from './filterContinent/filterContinent';
import FilterActivities from './filter Activities/filterActivities';
import SortName from './sorts/sortName';
import SortPopulation from './sorts/sortPopulation';

const Filters = () => {
  return (
    <div className={style.container}>
      <FilterContinent />
      <FilterActivities />
      <SortName />
      <SortPopulation />
    </div>
  );
};

export default Filters;
