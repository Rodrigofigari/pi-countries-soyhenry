import style from './card.module.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ imgFlag, name, continent, id, population }) => {
  const populations = population?.toLocaleString();

  return (
    <div className={style.containerCard}>
      <img className={style.img} src={imgFlag} alt="img not found" />

      <h2>
        <Link className={style.name} to={`/detail/${id}`}>
          {name}
        </Link>
      </h2>

      <h2 className={style.continent}>{continent}</h2>
      <h2 className={style.continent}>{populations}</h2>
    </div>
  );
};

export default Card;
