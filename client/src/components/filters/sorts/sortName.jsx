import style from "../filter Activities/filterAct.module.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByCountry,
  stateCurrentPage,
  countriesRender,
} from "../../../redux/actions/actions";

const SortName = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.upDateCountries);

  const handleCountries = (event) => {
    dispatch(orderByCountry(event.target.value));
    dispatch(stateCurrentPage(1));
    dispatch(countriesRender(allCountries.slice(0, 9)));
    console.log(event.target.value);
  };

  return (
    <div>
      <label className={style.btn}>Order by Name: </label>
      <select className={style.sel} onChange={handleCountries}>
        <option disabled selected>
          Select...
        </option>
        <option value="ascendente">A-Z</option>
        <option value="descendente">Z-A</option>
      </select>
    </div>
  );
};

export default SortName;
