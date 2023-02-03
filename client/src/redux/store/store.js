import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/reducer";
import thunkMiddleware from "redux-thunk"; // quien se va a encargarde hacer las peticiones que redux no puede hacer, nosotros le pedimos al thunkmiddleware que las haga a traves de las actions

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // pluggin de dev tools para el browser

const store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;

// appleMiddleware : Me permite hacer lo que redux no tiene que hacer, las actions que le peguen a la api
// compose : es una funcion que me permite aplicarle mejoras al store de redux
