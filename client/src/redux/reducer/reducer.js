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
} from '../actions/types';

export const initialState = {
  allCountries: [], // Estado base con los 250 >> traer actividades con los paises, solo nombre //
  upDateCountries: [], // Estado que se va air modificando y de aca van a ir sacando los demas
  renderCountries: [], // cartas por page
  activities: [], // utilizarlo para las option , sin paises
  detailCountry: {},
  currentPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        upDateCountries: action.payload,
      };

    case COUNTRIES_RENDER:
      return {
        ...state,
        renderCountries: action.payload,
      };

    case FILTER_CONTINENTS:
      const continent =
        action.payload === 'All'
          ? state.allCountries
          : state.allCountries.filter(
              (ele) => ele.continent === action.payload
            );
      return {
        ...state,
        upDateCountries: continent,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        upDateCountries: action.payload,
      };

    case ALL:
      return {
        ...state,
        upDateCountries: state.allCountries,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case FILTER_ACTIVITIES:
      // TENGO EN ALLCOUNTRIES TODOS LOS PAISES CON PROPS ACTIVIVITIES, EL CUAL ES UN ARRAY DE OBJETO
      // const all =
      //   action.payload === 'All' &&
      //   state.allCountries.filter((elem) => elem.activies.length > 0);
      // const activity = state.allCountries.filter((country) =>
      //   action.payload.includes(country.activities)
      // );
      // return {
      //   ...state,
      //   upDateCountries: action.payload === 'All' ? all : activity,
      const allSelect = [...state.activities]
        .map((ele) => ele.countries)
        .flat();

      const allSelectSet = function (array) {
        const countrySet = [];
        const names = [];
        array.forEach((ele) => {
          if (!names.includes(ele.name)) {
            names.push(ele.name);
            countrySet.push(ele);
          }
        });
        return countrySet;
      };

      return {
        ...state,
        upDateCountries:
          action.payload === 'All'
            ? allSelectSet(allSelect)
            : [...state.activities]
                .filter((ele) => ele.name === action.payload)
                .map((ele) => ele.countries) // me queda un array dentro de otro array
                .flat(),
      };

    case ORDER_COUNTRY:
      let order =
        action.payload === 'ascendente'
          ? state.upDateCountries.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.upDateCountries.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        upDateCountries: order,
      };

    case ORDER_POPULATION:
      let orderPop =
        action.payload === 'ascendente'
          ? state.upDateCountries.sort((a, b) => {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              return 0;
            })
          : state.upDateCountries.sort((a, b) => {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            });
      return {
        ...state,
        upDateCountries: orderPop,
      };

    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case DETAIL_ID:
      return {
        ...state,
        detailCountry: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;

/*
.map((ele, index, array) => {
            console.log('Estoy aca');
            ele.countries.forEach((element) => {
              array.push(element);
              console.log('Estoy alla');
            });
            return array;
          }),
*/
