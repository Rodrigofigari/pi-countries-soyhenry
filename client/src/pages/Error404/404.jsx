import style from './error.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className={style.divContainer}>
      <div className={style.divImg}>
        <Link className={style.btn} to={'/'}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Error404;
