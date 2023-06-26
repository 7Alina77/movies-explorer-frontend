import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';

function Navigation({isBurger}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className={`nav-movies ${isBurger ? `nav-movies_state_burger` : ''}`}>
      <ul className={`nav-movies__items ${isBurger && `nav-movies__items_state_burger` }`}>
        <li className={`nav-movies__item ${ path === '/movies' || path === '/profile' ? `nav-movies__item_state_active` : ''} ${ isBurger && `nav-movies__item-burger`} ${ isBurger && path === '/movies' ? `nav-movies__item-burger_state_active` : ''} link`}>
          <Link className='nav-movies__link link link-hover' to="/movies">
            Фильмы
          </Link>
        </li>
        <li className={`nav-movies__item ${ path === '/saved-movies' && `nav-movies__item_state_active`} ${ isBurger && `nav-movies__item-burger`} ${ isBurger && path === '/saved-movies' ? `nav-movies__item-burger_state_active` : ''} link`}>
          <Link className='nav-movies__link link link-hover' to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;