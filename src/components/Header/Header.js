import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import burger from '../../images/burger.svg';
import { Link, useLocation, Route, Routes} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import MainLogo from '../MainLogo/MainLogo';

function Header({isLoggedIn, onBurgerClick }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className={`header ${path === '/' && `header__grey`}`}>
      <div className="header__wrapper">
        <MainLogo />
        {(path === '/movies' || path === '/saved-movies' || path === '/profile') && (
          <>
            <Navigation />
              <nav className="header__nav">
                <Account />
                <button onClick={onBurgerClick} className='header__burger link-hover'><img className='header__burger-img' src={burger} alt='бургер меню'/></button>
              </nav>
          </>
        )}
        {(path === '/' &&!isLoggedIn) && (
          <ul className="header__auth">
            <li className="header__auth-item link link-hover">
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__auth-item link link-hover">
              <Link to="/signin" className="header__link header__link-btn">
                Войти
              </Link>
            </li>
          </ul>)}
          {(path === '/' && isLoggedIn) && (
            <>
              <Navigation />
              <Account />
              <button onClick={onBurgerClick} className='header__burger link-hover'><img className='header__burger-img' src={burger} alt='бургер меню'/></button>
            </>
          )}
      </div>
    </header>
  );
}

export default Header;
