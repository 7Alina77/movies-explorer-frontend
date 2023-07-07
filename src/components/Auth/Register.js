import './Auth.css';
import { Link } from "react-router-dom";
import MainLogo from '../MainLogo/MainLogo';
import { NAME_REG_EXP } from '../../utils/constants';
import useFormValidation from '../../hooks/useFormValidation';

function Register({errorOfAuth, onSubmit}) {
  const {values, errors, isFormValid, handleOnChange, handleResetValidation} = useFormValidation();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    onSubmit(values.name ,values.email , values.pass);
    handleResetValidation()
  } 

  return (
    <main className="authorization">
      <MainLogo />
      <h2 className="authorization__title">Добро пожаловать!</h2>
        <form onSubmit={handleSubmitRegister} id='authorization__form' className='authorization__form' noValidate>
          <div className="authorization__container">
            <label className='authorization__label'>Имя</label>
            <input className='authorization__input'
              required
              pattern={NAME_REG_EXP}
              maxLength={30}
              minLength={2}
              value={values.name}
              name="name"
              type="text"
              onChange={handleOnChange}          
            ></input>
            <p className={`authorization__validate ${(errors.name) && `authorization__validate_state_active`}`}>{errors.name}</p>
            <label className='authorization__label'>Email</label>
            <input className='authorization__input'
              required
              value={values.email}
              name="email"
              type="email"
              onChange={handleOnChange} 
            ></input>
            <p className={`authorization__validate ${(errors.email) && `authorization__validate_state_active`}`}>{errors.email}</p>
            <label className='authorization__label'>Пароль</label>
            <input className='authorization__input'
              required
              value={values.pass}
              maxLength={15}
              minLength={3}
              name="pass"
              type="password"
              onChange={handleOnChange}
            ></input>
            <p className={`authorization__validate ${(errors.pass) && `authorization__validate_state_active`}`}>{errors.pass}</p>
          </div>
          <p className='authorization__error'>{errorOfAuth}</p>
          <button form='authorization__form' disabled={!isFormValid} className={`authorization__submit link-hover ${!isFormValid && `authorization__submit_type_active`}`} type="submit">Зарегистрироваться</button>
        </form>
        <div className="authorization__login">
          <p>Уже зарегистрированы?</p>
          <Link to='/signin'className="authorization__link link link-hover">Войти</Link>
        </div>
    </main>
  )
}

export default Register;