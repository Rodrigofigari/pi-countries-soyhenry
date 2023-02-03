import style from "../filter Activities/filterAct.module.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  orderByPopulation,
  stateCurrentPage,
  countriesRender,
} from "../../../redux/actions/actions";

const SortPopulation = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.upDateCountries);

  const handleCountries = (event) => {
    dispatch(orderByPopulation(event.target.value));
    dispatch(stateCurrentPage(1));
    dispatch(countriesRender(allCountries.slice(0, 9)));
  };

  return (
    <div>
      <label className={style.btn}>Order by population: </label>
      <select className={style.sel} onChange={handleCountries}>
        <option disabled selected>
          Select...
        </option>
        <option value="ascendente"> - to + </option>
        <option value="descendente"> + to - </option>
      </select>
    </div>
  );
};

export default SortPopulation;
