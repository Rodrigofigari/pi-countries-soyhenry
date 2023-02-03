import style from './createActivity.module.css';

import React from 'react';
import Form from './Form/form';

import { Link } from 'react-router-dom';

const createActiviy = () => {
  return (
    <div className={style.container}>
      <Link className={style.btn} to={'/home'}>
        Go Home
      </Link>
      <Form />
    </div>
  );
};
export default createActiviy;
