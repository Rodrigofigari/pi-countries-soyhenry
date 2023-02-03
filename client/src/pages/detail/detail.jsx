import style from './detail.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { detailId } from '../../redux/actions/actions';

const Detail = () => {
  const dispatch = useDispatch();
  const { itemID } = useParams();

  // me puedo traer directamente al componente la info sin la necesidad de tener que pasar por el redux, solo este componente usa la info que nos traemos de la db. Fetch axios || axios y listo
  useEffect(() => {
    dispatch(detailId(itemID));
  }, [itemID, dispatch]);

  const country = useSelector((state) => state.detailCountry);
  const { imgFlag, name, id, continent, capital, subregion, area, activities } =
    country;

  const population = country.population?.toLocaleString(); // millares

  return (
    <div className={style.container}>
      <Link className={style.btn} to={'/home'}>
        Go Home
      </Link>

      <div className={style.contCard}>
        <img className={style.img} src={imgFlag} alt="img not found" />
        <h1>{name}</h1>
        <h3>{id}</h3>
        <h4>Continent: {continent}</h4>
        <h4>Capital: {capital}</h4>
        <h4>Subregion: {subregion}</h4>
        <h4>Area: {area}</h4>
        <h4>Population: {population}</h4>
      </div>
      <div className={style.contActivities}>
        <h3>Activities:</h3>
        {activities?.map((act, index) => (
          <h3 key={index}>{act.name}</h3> // me queda como un objeto de una sola porpiedad aunque haya incluido en sequelize solo el atributo name
        ))}
      </div>
    </div>
  );
};

export default Detail;
