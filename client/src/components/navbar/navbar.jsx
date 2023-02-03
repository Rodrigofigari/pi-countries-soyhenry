import React from 'react';
import SearchBar from './searchBar/searchBar';
import CreateBoton from './createBoton/createBoton';

import style from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={style.nvbar}>
      <SearchBar />
      <CreateBoton />
    </nav>
  );
};

export default Navbar;
