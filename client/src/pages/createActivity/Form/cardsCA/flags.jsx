import style from "./flags.module.css";

import React from "react";
import { useSelector } from "react-redux";

import CardsCA from "./cardsCA";

const Flags = ({ countries, deleteCountry }) => {
  const countriesDB = useSelector((state) =>
    state.allCountries.filter((country) => countries.includes(country.id))
  );
  const flags = countriesDB.map((ele) => ({
    name: ele.name,
    flag: ele.imgFlag,
    id: ele.id,
  }));

  return (
    <div className={style.container}>
      {flags.map((elem, index) => (
        <CardsCA
          name={elem.name}
          flag={elem.flag}
          id={elem.id}
          key={index}
          deleteCountry={deleteCountry}
        />
      ))}
    </div>
  );
};

export default Flags;
