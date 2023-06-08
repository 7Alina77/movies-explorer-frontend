import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import logo from '../../images/logo_main.svg';
import { Link, useLocation} from 'react-router-dom';

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
    <header className="header">
      <div className="header__wrapper">
        <Link to="/">
          <img className="header__logo" src={logo} alt="лого" />
        </Link>
        {/* {isLogedIn ? (
          <nav className="header__navigate header__navigate-movies">
            <ul className="header__movies text">
              <button
                className="header__burger-close"
                onClick={handleCloseMenu}
              ></button>
              <li
                className={`header__movies-item ${
                  path === "/" && "header__movies-item_selected"
                }`}
              >
                <Link to="/" className="link" onClick={handleCloseMenu}>
                  Главная
                </Link>
              </li>
              <li
                className={`header__movies-item ${
                  path === "/movies" && "header__movies-item_selected"
                }`}
              >
                <Link to="/movies" className="link" onClick={handleCloseMenu}>
                  Фильмы
                </Link>
              </li>
              <li
                className={`header__movies-item ${
                  path === "/saved-movies" && "header__movies-item_selected"
                }`}
              >
                <Link
                  to="/saved-movies"
                  className="link"
                  onClick={handleCloseMenu}
                >
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="header__movies-item">
                <Link
                  to="/profile"
                  className="header__link-profile color_secondary link"
                  onClick={handleCloseMenu}
                >
                  Аккаунт
                </Link>
              </li>
            </ul>
            <div className="header__burger link" onClick={handleOpenMenu}>
              <div className="header__burger-line"></div>
              <div className="header__burger-line"></div>
              <div className="header__burger-line"></div>
            </div>
          </nav>
          ) : ( */}
          <nav className="header__nav">
            <ul className="header__auth">
              <li className="header__auth-item">
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              </li>
              <li className="header__auth-item">
                <Link to="/sign-in" className="header__link header__link-btn">
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        {/*)}*/}
      </div>
    </header>
  );
}

export default Header;
