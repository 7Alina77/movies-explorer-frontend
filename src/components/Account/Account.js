import './Account.css';
import { Link } from 'react-router-dom';

function Account({isBurger}) {
  return (
    <>
      <Link to="/profile" className='account__auth-link link'>
        <button type='button' className={`account__auth-btn link-hover ${ isBurger && `account__auth-burger`}`}>Аккаунт</button>
      </Link>
    </>
  )
}

export default Account;