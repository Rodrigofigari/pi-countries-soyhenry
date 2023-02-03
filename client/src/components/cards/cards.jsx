import style from './cards.module.css';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from './card/card';
import { allSearchBtn } from '../../redux/actions/actions';

const Cards = () => {
  // Destructuring de countries
  const countries = useSelector((state) => state.renderCountries);

  // iria en otro comp
  const dispatch = useDispatch();
  const all = () => {
    dispatch(allSearchBtn());
  };

  return (
    <div className={style.containerDiv}>
      <button className={style.btn} onClick={all}>
        All
      </button>
      <div className={style.containerCards}>
        {countries.map((ele, index) => (
          <Card
            id={ele.id}
            key={index}
            imgFlag={ele.imgFlag}
            name={ele.name}
            continent={ele.continent}
            population={ele.population}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
