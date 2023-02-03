import React from 'react';
import style from './pOp.module.css';

const Pages = ({ allCountries, countriesXpage, selectPage, currentPage }) => {
  let pages = [];

  // al total de paises le tengo que restar nueve y divido por los 10
  // al resultado le sumo 1

  const maxPages = Math.ceil((allCountries.length - 9) / countriesXpage) + 1; // (-9) + 1
  //                                 ARRAY       divido   NUMERO  >> NO SE PUEDE (si o si .length)
  for (let i = 1; i <= maxPages; i++) {
    pages.push(i);
  }

  const prev = () => {
    currentPage >= 2 && selectPage(currentPage - 1);
  };

  const next = () => {
    currentPage < pages.length && selectPage(currentPage + 1);
  };

  //

  return (
    <div>
      <div className={style.prevNext}>
        <button className={style.btn} onClick={prev}>
          Prev
        </button>
        <p className={style.p}>
          {currentPage} of {pages.length}
        </p>
        <button className={style.btn} onClick={next}>
          Next
        </button>
      </div>
      <nav>
        <ul className={style.ul}>
          {pages &&
            pages.map((numberPage) => (
              <li className={style.li} key={numberPage}>
                <button
                  className={style.btn}
                  onClick={() => selectPage(numberPage)}
                >
                  {numberPage}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pages;
