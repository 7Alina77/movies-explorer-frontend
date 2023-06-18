import './MainLogo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_main.svg';

function MainLogo() {
  return(
    <Link className='main-logo link link-hover' to="/">
      <img className="main-logo__img link-hover" src={logo} alt="лого" />
    </Link>
  )
}

export default MainLogo;