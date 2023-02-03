import style from './createBoton.module.css';

import React from 'react';
import { Link } from 'react-router-dom';

const CreateBoton = () => {
  return (
    <div>
      <Link className={style.btn} to={'/create'}>
        Create activity
      </Link>
    </div>
  );
};

export default CreateBoton;
