import style from '../filter Activities/filterAct.module.css';

import { useDispatch } from 'react-redux';
import { filterContinent } from '../../../redux/actions/actions';

const FilterContinent = () => {
  const dispatch = useDispatch();

  const handleSelectFilter = (event) => {
    dispatch(filterContinent(event.target.value));
  };

  return (
    <div>
      <label className={style.btn}>Continents: </label>
      <select className={style.sel} onChange={handleSelectFilter}>
        <option disabled selected>
          Select...
        </option>
        <option value="All">All</option>
        <option value="North America">North America</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="South America">South America</option>
        <option value="Antarctica">Antarctica</option>
      </select>
    </div>
  );
};

export default FilterContinent;
