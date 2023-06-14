import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import logo from '../../images/logo_main.svg';
import { Link, useLocation, Route, Routes} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locationIs, setLocationIs] = useState({main: null, pathLink: '', text:''});

  const location = useLocation();
  const path = location.pathname;
  const {main, pathLink, text} = locationIs;

  const handleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <header className={`header ${path === '/' && `header__grey`}`}>
      <div className="header__wrapper">
        <Link to="/">
          <img className="header__logo link-hover" src={logo} alt="лого" />
        </Link>
        {path === '/movies' || path === '/saved-movies' ? <Navigation /> : ''}
        <nav className="header__nav">
        {path === '/' ? (
          <ul className="header__auth">
            <li className="header__auth-item link link-hover">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__auth-item link link-hover">
              <Link to="/sign-in" className="header__link header__link-btn">
                Войти
              </Link>
            </li>
          </ul>) : (
            <Link to="/profile" className='header__auth-link'>
              <button type='button' className='header__auth-btn link link-hover'>Аккаунт</button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
