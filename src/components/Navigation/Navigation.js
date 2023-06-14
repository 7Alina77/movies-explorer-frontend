import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className='nav-movies'>
      <ul className='nav-movies__items'>
        <li className={`nav-movies__item ${ path === '/movies' && `nav-movies__item_state_active`} link`}>
          <Link className='nav-movies__link link link-hover' to="/movies">
            Фильмы
          </Link>
        </li>
        <li className={`nav-movies__item ${ path === '/saved-movies' && `nav-movies__item_state_active`} link`}>
          <Link className='nav-movies__link link link-hover' to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;