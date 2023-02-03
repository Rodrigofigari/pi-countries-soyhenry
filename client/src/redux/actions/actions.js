import {
  GET_COUNTRIES,
  COUNTRIES_RENDER,
  FILTER_CONTINENTS,
  SEARCH_BY_NAME,
  GET_ACTIVITIES,
  FILTER_ACTIVITIES,
  ORDER_COUNTRY,
  DETAIL_ID,
  CURRENT_PAGE,
  ORDER_POPULATION,
  ALL,
} from './types';

import axios from 'axios';

export const getCountries = () => {
  // esta segunda funcion llegara al thunk quien se encarga de hacer las peticiones. La action no puede hacer una peticion, pero si puede retornar una funcion para que el thunk la recibda y ahaga la peticio
  return function (dispatch) {
    fetch('http://localhost:3001/countries')
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_COUNTRIES, payload: data })) // el reducer recibe la action igual que siemore y no sabe de todo lo anterior
      .catch((error) => console.log(error));
  };
};

export const stateCurrentPage = (number) => {
  return { type: CURRENT_PAGE, payload: number };
};

export const countriesRender = (countries) => {
  return { type: COUNTRIES_RENDER, payload: countries };
};

export const filterContinent = (continent) => {
  return { type: FILTER_CONTINENTS, payload: continent };
};

export const detailId = (id) => {
  return async function (dispatch) {
    const result = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({ type: DETAIL_ID, payload: result.data });
  };
};

export const orderByCountry = (order) => {
  return { type: ORDER_COUNTRY, payload: order };
};

export const orderByPopulation = (order) => {
  return { type: ORDER_POPULATION, payload: order };
};

// Atajo el error en el searchBar
export const searchByName = (name) => {
  return async function (dispatch) {
    const result = await axios.get(
      `http://localhost:3001/countries?name=${name}`
    );
    return dispatch({ type: SEARCH_BY_NAME, payload: result.data });
  };
};

export const allSearchBtn = () => {
  return { type: ALL };
};

export const filterActivity = (activity) => {
  return { type: FILTER_ACTIVITIES, payload: activity };
};

export const getActivities = () => {
  return async function (dispatch) {
    try {
      const result = await axios.get('http://localhost:3001/activities');
      return dispatch({ type: GET_ACTIVITIES, payload: result.data });
    } catch (error) {
      return error;
    }
  };
};

// export const searchByName = (name) => {
//   return async function (dispatch) {
//     try {
//       const result = await axios.get(
//         `http://localhost:3001/countries?name=${name}`
//       );
//       return dispatch({ type: SEARCH_BY_NAME, payload: result.data });
//     } catch (error) {
//       return error;
//     }
//   };
// };
