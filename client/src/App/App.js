import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/login/login';
import Home from '../pages/home/home';
import Detail from '../pages/detail/detail';
import createActiviy from '../pages/createActivity/createActivity';
import Error404 from '../pages/Error404/404';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <Switch>
      <Route exact path={'/'} component={Login} />
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/detail/:itemID'} component={Detail} />
      <Route exact path={'/create'} component={createActiviy} />
      <Route component={Error404} />
    </Switch>
  );
}

export default App;

/* Si quisiese paasr props tengo que usar render || children || envolver al componente a renderizar en el <Route> en vez de component ->*/
/*<Route exact path={"/home"} render={() => <Home name={'Rodrigo'}/>}/> */
/* 
  <Route path={'Home'}>
    <Home name={"Rodrigo"} age={"25"} ... />
  </Route>
 */

// IMPEDIR QUE PUEDA IR A '/HOME' SIN A VER PASADO POR EL BOTON DE WELCOME '/'
//   const [access, setAccess] = useState(false);
//   const navigate = useHistory();

//   useEffect(() => {
//     access && navigate("/");
//   }, [access]);

//   const login = () => {
//     setAccess(true);
//     navigate("/home");
//   };
