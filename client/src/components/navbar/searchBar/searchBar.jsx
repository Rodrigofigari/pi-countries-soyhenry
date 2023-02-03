import style from './searchBar.module.css';
import logo from '../../../imgs/vidrio-de-aumento.png';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchByName } from '../../../redux/actions/actions';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  //---------------------------------------------//
  // ver de hacer separado el dispatch del ternario, almacenar su resultado y mostrar el error en caso de serlo
  const handleButton = () => {
    input
      ? dispatch(searchByName(input)).catch((err) => alert(err.response.data))
      : alert('Enter Country'); // setError('Enter Country')
    setInput('');
  };

  // ENTER
  // function enter(e) {
  //   if (e.keyCode === 13) {
  //     handleButton();
  //   }
  // }
  // window.onkeydown = enter;

  return (
    <div className={style.divContainer}>
      <input
        className={style.input}
        placeholder="Search country..."
        name="name"
        type={'text'}
        value={input}
        onChange={handleInput}
      />
      <button className={style.btn} onClick={handleButton}>
        <img src={logo} alt="" />
      </button>
      {/* {!input && <span>{error}</span>} */}
    </div>
  );
};

export default SearchBar;
