import style from "./flags.module.css";
import React from "react";

const CardsCA = ({ name, flag, id, deleteCountry }) => {
  return (
    <div className={style.contCard}>
      <p className={style.cruz} onClick={() => deleteCountry(id)}>
        x
      </p>
      {/* <button onClick={() => deleteCountry(id)}>x</button> */}
      <img className={style.img} src={flag} alt="img not found"></img>
      <h4>{name}</h4>
    </div>
  );
};
export default CardsCA;
