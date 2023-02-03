import style from './login.module.css';
import Logo from '../../imgs/logo_canva.png';

import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // const [access, setAccess] = useState(false);
  // const navigate = useHistory(); // useNavigate version 6
  // useEffect(() => {
  //   access && navigate("/");
  // }, [access]);

  // const login = () => {
  //   setAccess(true);
  //   navigate("/home");
  // };

  return (
    <div className={style.container}>
      <img className={style.img} src={Logo} alt="" />
      <button className={style.btn}>
        <Link className={style.link} to={'/home'}>
          Welcome
        </Link>
      </button>
    </div>
  );
}

export default Login;
