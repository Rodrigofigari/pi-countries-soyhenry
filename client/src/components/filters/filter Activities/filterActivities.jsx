import style from './filterAct.module.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, filterActivity } from '../../../redux/actions/actions';

/*
  1. Ver la posibilidad de incluir a getAllCountries el atributo del modelo Acitvity "name", asi ya me traigo la act que tenga cada pais
  2. me vendria una prop que seria un array con obj dentro.
  3. Tendria que sacar ese array, solo los que tengan el length > 0
  4. sacar los duplicados y quedarme solo con los nombres de las act para pasarlas a las options
  5. Ver como hacer el filtrado a los paises por la condicion de que su prop "activities" tiene que incluir alguna de las acti que estan en el array
*/

const FilterActivities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const dataDB = useSelector((state) => state.activities);
  const activities = dataDB.map((ele) => ele.name);

  const handleSelectedActivity = (event) => {
    dispatch(filterActivity(event.target.value));
  };

  return (
    <div>
      <label className={style.btn}>Activities: </label>
      <select className={style.sel} onChange={handleSelectedActivity}>
        <option disabled selected>
          Select...
        </option>
        <option value="All">All</option>
        {activities.map((ele, index) => (
          <option value={ele} key={index}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterActivities;
