import Account from '../Account/Account';
import './BurgerMenu.css';
import { Link } from 'react-router-dom';
import cross from '../../images/cross.svg';
import Navigation from '../Navigation/Navigation';

function BurgerMenu({ isBurger, onClose }) {
  return (
    <section className={`burger ${isBurger && `burger-active`}`}>
        <div className={`burger__wrapper ${isBurger && `burger__wrapper_state_active`}`}>
          <nav className={`burger__menu ${isBurger && `burger__menu_state_active`}`}>
            <button onClick={onClose} className='burger__menu-btn link-hover'>
              <img className='burger__menu-img' src={cross} alt='кнопка закрытия бокового меню' />
            </button>
            <ul className='burger__menu-items' >
              <li className='burger__menu-item link link-hover'>
                <Link className='link link-hover' to="/">Главная</Link>
              </li>
              <li className='burger__menu-item link link-hover'>
                <Navigation isBurger = {isBurger}/>
              </li>
              <li className='burger__menu-item link link-hover'>
                <Account isBurger = {isBurger}/>
              </li>
            </ul>
          </nav>
        </div>
    </section>
  )
}

export default BurgerMenu;